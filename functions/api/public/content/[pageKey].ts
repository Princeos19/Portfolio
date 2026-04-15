import { PAGE_SCHEMAS } from '../../../_lib/content-schema';
import { jsonResponse } from '../../../_lib/http';
import { assertKnownPage } from '../../../_lib/validators';

type ContentEnv = Env;

type PublicPageSectionRow = {
  section_key: string;
  content_json: string;
  updated_at: string | null;
};

export async function onRequestGet({
  env,
  params,
}: {
  env: ContentEnv;
  params: { pageKey: string };
}) {
  const { pageKey } = params;

  try {
    assertKnownPage(pageKey);
  } catch {
    return jsonResponse({ error: 'Unknown page' }, { status: 404 });
  }

  const result = await env.DB.prepare(
    'SELECT section_key, content_json, updated_at FROM page_content WHERE page_key = ?',
  )
    .bind(pageKey)
    .all<PublicPageSectionRow>();

  const rows = new Map(result.results.map((row) => [row.section_key, row]));
  const sections = PAGE_SCHEMAS[pageKey].map((sectionKey) => {
    const row = rows.get(sectionKey);

    return {
      sectionKey,
      contentJson: row?.content_json ?? '{}',
      updatedAt: row?.updated_at ?? null,
    };
  });

  return jsonResponse({ pageKey, sections });
}
