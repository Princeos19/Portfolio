import { jsonResponse, readJsonBody } from '../../../_lib/http';

type InquiryRequestBody = {
  name?: string;
  email?: string;
  message?: string;
};

type InquiryRow = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  source_page: string | null;
  status: string;
  archived: number;
  created_at: string;
  updated_at: string;
};

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isPresentString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function withinLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  const body = await readJsonBody<InquiryRequestBody>(request);
  if (
    !body ||
    !isPresentString(body.name) ||
    !isPresentString(body.email) ||
    !isPresentString(body.message)
  ) {
    return jsonResponse({ error: 'Invalid inquiry payload' }, { status: 400 });
  }

  const name = normalizeText(body.name);
  const email = normalizeText(body.email);
  const message = normalizeText(body.message);

  if (!withinLength(name, 120) || !withinLength(email, 254) || !withinLength(message, 5000)) {
    return jsonResponse({ error: 'Invalid inquiry payload' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return jsonResponse({ error: 'Invalid inquiry payload' }, { status: 400 });
  }

  const cutoff = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  const recentSubmissions = await env.DB.prepare(
    `
      SELECT COUNT(*) as count
      FROM inquiries
      WHERE LOWER(email) = ?
        AND created_at >= ?
    `,
  )
    .bind(email.toLowerCase(), cutoff)
    .first<{ count: number }>();

  if ((recentSubmissions?.count ?? 0) >= 3) {
    return jsonResponse(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429 },
    );
  }

  const now = new Date().toISOString();
  const result = await env.DB.prepare(
    `
      INSERT INTO inquiries (
        name,
        email,
        company,
        message,
        source_page,
        status,
        archived,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, 'new', 0, ?, ?)
    `,
  )
    .bind(name, email, null, message, 'contact', now, now)
    .run();

  const insertedId = Number(result.meta.last_row_id);

  const inquiry = await env.DB.prepare(
    `
      SELECT id, name, email, company, message, source_page, status, archived, created_at, updated_at
      FROM inquiries
      WHERE id = ?
      LIMIT 1
    `,
  )
    .bind(insertedId)
    .first<InquiryRow>();

  return jsonResponse({
    ok: true,
    inquiry: inquiry
      ? {
          id: inquiry.id,
          name: inquiry.name,
          email: inquiry.email,
          company: inquiry.company,
          message: inquiry.message,
          sourcePage: inquiry.source_page,
          status: inquiry.status,
          archived: inquiry.archived === 1,
          createdAt: inquiry.created_at,
          updatedAt: inquiry.updated_at,
        }
      : null,
  });
}
