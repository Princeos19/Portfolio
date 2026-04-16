import { hashToken } from '../../../../../_lib/auth';
import { jsonResponse, parseCookieHeader, readJsonBody } from '../../../../../_lib/http';

type AdminEnv = Env;

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

type ArchiveBody = {
  archived?: boolean;
};

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

function parseInquiryId(id: string): number | null {
  const parsed = Number.parseInt(id, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
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

  const inquiryId = parseInquiryId(params.id);
  if (!inquiryId) {
    return jsonResponse({ error: 'Invalid inquiry id' }, { status: 400 });
  }

  const inquiry = await env.DB.prepare(
    'SELECT id, name, email, company, message, source_page, status, archived, created_at, updated_at FROM inquiries WHERE id = ? LIMIT 1',
  )
    .bind(inquiryId)
    .first<InquiryRow>();

  if (!inquiry) {
    return jsonResponse({ error: 'Inquiry not found' }, { status: 404 });
  }

  const body = await readJsonBody<ArchiveBody>(request);
  if (!body || typeof body.archived !== 'boolean') {
    return jsonResponse({ error: 'archived must be a boolean' }, { status: 400 });
  }

  const archived = body.archived;
  const updatedAt = new Date().toISOString();

  await env.DB.prepare('UPDATE inquiries SET archived = ?, updated_at = ? WHERE id = ?')
    .bind(archived ? 1 : 0, updatedAt, inquiryId)
    .run();

  const updated = await env.DB.prepare(
    'SELECT id, name, email, company, message, source_page, status, archived, created_at, updated_at FROM inquiries WHERE id = ? LIMIT 1',
  )
    .bind(inquiryId)
    .first<InquiryRow>();

  if (!updated) {
    return jsonResponse({ error: 'Inquiry update failed' }, { status: 500 });
  }

  return jsonResponse({
    inquiry: {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      company: updated.company,
      message: updated.message,
      sourcePage: updated.source_page,
      status: updated.status,
      archived: updated.archived === 1,
      createdAt: updated.created_at,
      updatedAt: updated.updated_at,
    },
  });
}
