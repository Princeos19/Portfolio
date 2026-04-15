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

export async function onRequestGet({ env }: { env: PublicEnv }) {
  const now = new Date().toISOString();
  const result = await env.DB.prepare(
    `
      SELECT id, slug, title, summary, status, tags_json, cover_image_url, published_at, updated_at
      FROM portfolio_projects
      WHERE status = 'published'
        AND (published_at IS NULL OR published_at <= ?)
      ORDER BY updated_at DESC, id DESC
    `,
  )
    .bind(now)
    .all<PortfolioProjectRow>();

  return jsonResponse({
    projects: result.results.map(mapProjectRow),
  });
}
