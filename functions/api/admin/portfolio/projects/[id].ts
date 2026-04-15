import { hashToken } from '../../../../_lib/auth';
import { jsonResponse, parseCookieHeader, readJsonBody } from '../../../../_lib/http';
import { normalizeSlug } from '../../../../_lib/validators';

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

function parseTags(tagsJson: string): string[] {
  try {
    const parsed = JSON.parse(tagsJson);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((tag): tag is string => typeof tag === 'string')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  } catch {
    return [];
  }
}

function serializeTags(tags: unknown): string {
  if (!Array.isArray(tags)) {
    return '[]';
  }

  return JSON.stringify(
    tags
      .filter((tag): tag is string => typeof tag === 'string')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0),
  );
}

function parseTagsJson(tagsJson: string): string[] {
  try {
    const parsed = JSON.parse(tagsJson);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((tag): tag is string => typeof tag === 'string')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
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

async function makeUniqueSlug(env: AdminEnv, desiredSlug: string, excludedId: number): Promise<string> {
  const baseSlug = desiredSlug.trim() || 'project';
  let candidate = baseSlug;
  let suffix = 2;

  while (suffix < 100) {
    const existing = await env.DB.prepare(
      'SELECT id FROM portfolio_projects WHERE slug = ? AND id != ? LIMIT 1',
    )
      .bind(candidate, excludedId)
      .first<{ id: number }>();

    if (!existing) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return `${baseSlug}-${Date.now()}`;
}

function parseProjectId(id: string): number | null {
  const projectId = Number.parseInt(id, 10);
  return Number.isInteger(projectId) && projectId > 0 ? projectId : null;
}

export async function onRequestGet({ request, env, params }: { request: Request; env: AdminEnv; params: { id: string } }) {
  const authError = await requireAdminSession(request, env);
  if (authError) {
    return authError;
  }

  const projectId = parseProjectId(params.id);
  if (!projectId) {
    return jsonResponse({ error: 'Invalid project id' }, { status: 400 });
  }

  const project = await env.DB.prepare(
    `
      SELECT id, slug, title, summary, status, tags_json, cover_image_url, published_at, updated_at
      FROM portfolio_projects
      WHERE id = ?
      LIMIT 1
    `,
  )
    .bind(projectId)
    .first<PortfolioProjectRow>();

  if (!project) {
    return jsonResponse({ error: 'Project not found' }, { status: 404 });
  }

  return jsonResponse({ project: mapProjectRow(project) });
}

export async function onRequestPut({
  request,
  env,
  params,
}: {
  request: Request;
  env: AdminEnv;
  params: { id: string };
}) {
  const authError = await requireAdminSession(request, env);
  if (authError) {
    return authError;
  }

  const projectId = parseProjectId(params.id);
  if (!projectId) {
    return jsonResponse({ error: 'Invalid project id' }, { status: 400 });
  }

  const existing = await env.DB.prepare(
    `
      SELECT id, slug, title, summary, status, tags_json, cover_image_url, published_at, updated_at
      FROM portfolio_projects
      WHERE id = ?
      LIMIT 1
    `,
  )
    .bind(projectId)
    .first<PortfolioProjectRow>();

  if (!existing) {
    return jsonResponse({ error: 'Project not found' }, { status: 404 });
  }

  const body = await readJsonBody<ProjectBody>(request);
  const title = typeof body?.title === 'string' && body.title.trim() ? body.title.trim() : existing.title;
  const summary = typeof body?.summary === 'string' && body.summary.trim() ? body.summary.trim() : existing.summary;
  const status = typeof body?.status === 'string' && body.status.trim() ? body.status.trim() : existing.status;
  const tagsJson = Array.isArray(body?.tags) ? serializeTags(body.tags) : existing.tags_json;
  const coverImageUrl =
    body?.coverImageUrl === null
      ? null
      : typeof body?.coverImageUrl === 'string' && body.coverImageUrl.trim()
        ? body.coverImageUrl.trim()
        : existing.cover_image_url;
  const nextPublishedAt =
    body?.publishedAt === null
      ? null
      : typeof body?.publishedAt === 'string'
        ? body.publishedAt
        : existing.published_at ?? (status === 'published' ? new Date().toISOString() : null);
  const desiredSlug =
    typeof body?.slug === 'string' && body.slug.trim() ? normalizeSlug(body.slug) : existing.slug;
  const slug = desiredSlug === existing.slug ? existing.slug : await makeUniqueSlug(env, desiredSlug, existing.id);
  const updatedAt = new Date().toISOString();

  await env.DB.prepare(
    `
      UPDATE portfolio_projects
      SET slug = ?, title = ?, summary = ?, status = ?, tags_json = ?, cover_image_url = ?, published_at = ?, updated_at = ?
      WHERE id = ?
    `,
  )
    .bind(slug, title, summary, status, tagsJson, coverImageUrl, nextPublishedAt, updatedAt, projectId)
    .run();

  const updated = await env.DB.prepare(
    `
      SELECT id, slug, title, summary, status, tags_json, cover_image_url, published_at, updated_at
      FROM portfolio_projects
      WHERE id = ?
      LIMIT 1
    `,
  )
    .bind(projectId)
    .first<PortfolioProjectRow>();

  if (!updated) {
    return jsonResponse({ error: 'Project update failed' }, { status: 500 });
  }

  return jsonResponse({ project: mapProjectRow(updated) });
}

export async function onRequestDelete({ request, env, params }: { request: Request; env: AdminEnv; params: { id: string } }) {
  const authError = await requireAdminSession(request, env);
  if (authError) {
    return authError;
  }

  const projectId = parseProjectId(params.id);
  if (!projectId) {
    return jsonResponse({ error: 'Invalid project id' }, { status: 400 });
  }

  const existing = await env.DB.prepare('SELECT id FROM portfolio_projects WHERE id = ? LIMIT 1')
    .bind(projectId)
    .first<{ id: number }>();

  if (!existing) {
    return jsonResponse({ error: 'Project not found' }, { status: 404 });
  }

  await env.DB.prepare('DELETE FROM portfolio_projects WHERE id = ?').bind(projectId).run();

  return jsonResponse({ ok: true });
}
