import { jsonResponse } from '../../../_lib/http';

type PublicEnv = Env;

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

function parseTagsJson(tagsJson: string): string[] {
  return parseTags(tagsJson);
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

export async function onRequestGet({
  env,
  params,
}: {
  env: PublicEnv;
  params: { slug: string };
}) {
  const { slug } = params;

  if (!slug) {
    return jsonResponse({ error: 'Project not found' }, { status: 404 });
  }

  const now = new Date().toISOString();
  const project = await env.DB.prepare(
    `
      SELECT id, slug, title, summary, status, tags_json, cover_image_url, published_at, updated_at
      FROM portfolio_projects
      WHERE slug = ?
        AND status = 'published'
        AND (published_at IS NULL OR published_at <= ?)
      LIMIT 1
    `,
  )
    .bind(slug, now)
    .first<PortfolioProjectRow>();

  if (!project) {
    return jsonResponse({ error: 'Project not found' }, { status: 404 });
  }

  return jsonResponse({ project: mapProjectRow(project) });
}
