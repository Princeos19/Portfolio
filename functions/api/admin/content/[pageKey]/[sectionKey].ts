import { jsonResponse, readJsonBody } from '../../../../_lib/http';
import { assertKnownPageAndSection } from '../../../../_lib/validators';

type ContentEnv = Env;

type UpdateSectionBody = {
  contentJson?: string;
};

type UpsertedSectionRow = {
  section_key: string;
  content_json: string;
  updated_at: string;
};

export async function onRequestPut({
  env,
  params,
  request,
}: {
  env: ContentEnv;
  params: { pageKey: string; sectionKey: string };
  request: Request;
}) {
  const { pageKey, sectionKey } = params;

  try {
    assertKnownPageAndSection(pageKey, sectionKey);
  } catch (error) {
    if (error instanceof Error && error.message === 'Unknown section') {
      return jsonResponse({ error: error.message }, { status: 400 });
    }

    return jsonResponse({ error: 'Unknown page' }, { status: 404 });
  }

  const body = await readJsonBody<UpdateSectionBody>(request);
  const rawContentJson = body?.contentJson;

  if (typeof rawContentJson !== 'string') {
    return jsonResponse({ error: 'contentJson is required' }, { status: 400 });
  }

  let parsedContent: unknown;
  try {
    parsedContent = JSON.parse(rawContentJson);
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, { status: 400 });
  }

  const normalizedContentJson = JSON.stringify(parsedContent, null, 2);
  const updatedAt = new Date().toISOString();

  await env.DB.prepare(
    `
      INSERT INTO page_content (page_key, section_key, content_json, updated_at)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(page_key, section_key)
      DO UPDATE SET
        content_json = excluded.content_json,
        updated_at = excluded.updated_at
    `,
  )
    .bind(pageKey, sectionKey, normalizedContentJson, updatedAt)
    .run();

  const row = await env.DB.prepare(
    'SELECT section_key, content_json, updated_at FROM page_content WHERE page_key = ? AND section_key = ? LIMIT 1',
  )
    .bind(pageKey, sectionKey)
    .first<UpsertedSectionRow>();

  return jsonResponse({
    pageKey,
    sectionKey: row?.section_key ?? sectionKey,
    contentJson: row?.content_json ?? normalizedContentJson,
    updatedAt: row?.updated_at ?? updatedAt,
  });
}
