import { hashToken } from '../../../_lib/auth';
import { jsonResponse, parseCookieHeader, readJsonBody } from '../../../_lib/http';
import { normalizeSlug } from '../../../_lib/validators';

type AdminEnv = Env;

type PortfolioProjectRow = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  status: string;
  tags_json: string;
  cover_image_url: string | null;
  published_at: string | null;
  updated_at: string;
};

type PortfolioProject = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  status: string;
  tags: string[];
  coverImageUrl: string | null;
  publishedAt: string | null;
  updatedAt: string;
};

type ProjectBody = {
  slug?: string;
  title?: string;
  summary?: string;
  status?: string;
  tags?: unknown;
  coverImageUrl?: string | null;
  publishedAt?: string | null;
};

function parseTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags
    .filter((tag): tag is string => typeof tag === 'string')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

function serializeTags(tags: unknown): string {
  return JSON.stringify(parseTags(tags));
}

function parseTagsJson(tagsJson: string): string[] {
  try {
    return parseTags(JSON.parse(tagsJson));
  } catch {
    return [];
  }
}

function mapProjectRow(row: PortfolioProjectRow): PortfolioProject {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    status: row.status,
    tags: parseTagsJson(row.tags_json),
    coverImageUrl: row.cover_image_url,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  };
}

async function requireAdminSession(request: Request, env: AdminEnv): Promise<Response | null> {
  const cookies = parseCookieHeader(request.headers.get('cookie'));
  const token = cookies.admin_session;

  if (!token) {
    return jsonResponse({ error: 'Unauthorized' }, { status: 401 });
  }

  const tokenHash = await hashToken(token);
  const session = await env.DB.prepare(
    'SELECT token_hash, expires_at FROM admin_sessions WHERE token_hash = ? LIMIT 1',
  )
    .bind(tokenHash)
    .first<{ token_hash: string; expires_at: string }>();

  if (!session || session.token_hash !== tokenHash || Date.parse(session.expires_at) <= Date.now()) {
    return jsonResponse({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}

async function makeUniqueSlug(env: AdminEnv, desiredSlug: string): Promise<string> {
  const baseSlug = desiredSlug.trim() || 'project';
  let candidate = baseSlug;
  let suffix = 2;

  while (suffix < 100) {
    const existing = await env.DB.prepare('SELECT id FROM portfolio_projects WHERE slug = ? LIMIT 1')
      .bind(candidate)
      .first<{ id: number }>();

    if (!existing) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return `${baseSlug}-${Date.now()}`;
}

export async function onRequestGet({ request, env }: { request: Request; env: AdminEnv }) {
  const authError = await requireAdminSession(request, env);
  if (authError) {
    return authError;
  }

  const result = await env.DB.prepare(
    `
      SELECT id, slug, title, summary, status, tags_json, cover_image_url, published_at, updated_at
      FROM portfolio_projects
      ORDER BY updated_at DESC, id DESC
    `,
  ).all<PortfolioProjectRow>();

  return jsonResponse({
    projects: result.results.map(mapProjectRow),
  });
}

export async function onRequestPost({ request, env }: { request: Request; env: AdminEnv }) {
  const authError = await requireAdminSession(request, env);
  if (authError) {
    return authError;
  }

  const body = await readJsonBody<ProjectBody>(request);
  const title = typeof body?.title === 'string' ? body.title.trim() : '';
  const summary = typeof body?.summary === 'string' ? body.summary.trim() : '';

  if (!title) {
    return jsonResponse({ error: 'title is required' }, { status: 400 });
  }

  if (!summary) {
    return jsonResponse({ error: 'summary is required' }, { status: 400 });
  }

  const status = typeof body?.status === 'string' && body.status.trim() ? body.status.trim() : 'draft';
  const baseSlug = typeof body?.slug === 'string' && body.slug.trim() ? normalizeSlug(body.slug) : normalizeSlug(title);
  const slug = await makeUniqueSlug(env, baseSlug);
  const tagsJson = serializeTags(body?.tags);
  const coverImageUrl = typeof body?.coverImageUrl === 'string' && body.coverImageUrl.trim() ? body.coverImageUrl.trim() : null;
  const updatedAt = new Date().toISOString();
  const publishedAt = typeof body?.publishedAt === 'string' ? body.publishedAt : status === 'published' ? updatedAt : null;

  await env.DB.prepare(
    `
      INSERT INTO portfolio_projects (
        slug, title, summary, status, tags_json, cover_image_url, published_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
  )
    .bind(slug, title, summary, status, tagsJson, coverImageUrl, publishedAt, updatedAt)
    .run();

  const created = await env.DB.prepare(
    `
      SELECT id, slug, title, summary, status, tags_json, cover_image_url, published_at, updated_at
      FROM portfolio_projects
      WHERE slug = ?
      LIMIT 1
    `,
  )
    .bind(slug)
    .first<PortfolioProjectRow>();

  if (!created) {
    return jsonResponse({ error: 'Project creation failed' }, { status: 500 });
  }

  return jsonResponse({ project: mapProjectRow(created) }, { status: 201 });
}
