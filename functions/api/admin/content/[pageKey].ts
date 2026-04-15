import { PAGE_SCHEMAS } from '../../../_lib/content-schema';
import { assertKnownPage } from '../../../_lib/validators';
import { jsonResponse } from '../../../_lib/http';

type ContentEnv = Env;

type AdminPageSectionRow = {
  section_key: string;
  content_json: string;
  updated_at: string;
};

export async function onRequestGet({ env, params }: { env: ContentEnv; params: { pageKey: string } }) {
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
    .all<AdminPageSectionRow>();

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
