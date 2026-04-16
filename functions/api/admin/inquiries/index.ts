import { hashToken } from '../../../_lib/auth';
import { jsonResponse, parseCookieHeader } from '../../../_lib/http';

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

type InquiryResponseRow = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  sourcePage: string | null;
  status: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
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

function parseArchiveFilter(value: string | null): 0 | 1 | null {
  if (value === '0' || value === 'false' || value === 'active') {
    return 0;
  }

  if (value === '1' || value === 'true' || value === 'archived') {
    return 1;
  }

  return null;
}

function normalizeSearch(value: string | null): string {
  return value?.trim() ?? '';
}

function mapInquiry(row: InquiryRow): InquiryResponseRow {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company,
    message: row.message,
    sourcePage: row.source_page,
    status: row.status,
    archived: row.archived === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function onRequestGet({ request, env }: { request: Request; env: AdminEnv }) {
  const authError = await requireAdminSession(request, env);
  if (authError) {
    return authError;
  }

  const url = new URL(request.url);
  const statusFilter = normalizeSearch(url.searchParams.get('status'));
  const archiveFilter = parseArchiveFilter(url.searchParams.get('archive'));
  const searchTerm = normalizeSearch(url.searchParams.get('search'));

  const clauses: string[] = [];
  const values: Array<string | number> = [];

  if (statusFilter && statusFilter !== 'all') {
    clauses.push('status = ?');
    values.push(statusFilter);
  }

  if (archiveFilter !== null) {
    clauses.push('archived = ?');
    values.push(archiveFilter);
  }

  if (searchTerm) {
    clauses.push(
      `LOWER(COALESCE(name, '') || ' ' || COALESCE(email, '') || ' ' || COALESCE(company, '') || ' ' || COALESCE(message, '')) LIKE ?`,
    );
    values.push(`%${searchTerm.toLowerCase()}%`);
  }

  const whereClause = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
  const query = `
    SELECT id, name, email, company, message, source_page, status, archived, created_at, updated_at
    FROM inquiries
    ${whereClause}
    ORDER BY archived ASC, updated_at DESC, id DESC
  `;

  const statement = values.length > 0 ? env.DB.prepare(query).bind(...values) : env.DB.prepare(query);
  const result = await statement.all<InquiryRow>();

  return jsonResponse({
    inquiries: result.results.map(mapInquiry),
  });
}
