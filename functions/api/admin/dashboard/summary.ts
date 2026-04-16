import { hashToken } from '../../../../_lib/auth';
import { jsonResponse, parseCookieHeader } from '../../../../_lib/http';

async function requireAdminSession(request: Request, env: Env): Promise<Response | null> {
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

export async function onRequestGet({ request, env }: { request: Request; env: Env }) {
  const authError = await requireAdminSession(request, env);
  if (authError) {
    return authError;
  }

  const [projectsResult, inquiriesResult, newInquiriesResult] = await Promise.all([
    env.DB.prepare('SELECT COUNT(*) AS count FROM portfolio_projects').first<{ count: number }>(),
    env.DB.prepare('SELECT COUNT(*) AS count FROM inquiries').first<{ count: number }>(),
    env.DB.prepare("SELECT COUNT(*) AS count FROM inquiries WHERE status = 'new' AND archived = 0").first<{ count: number }>(),
  ]);

  return jsonResponse({
    projectsCount: projectsResult?.count ?? 0,
    inquiriesCount: inquiriesResult?.count ?? 0,
    newInquiriesCount: newInquiriesResult?.count ?? 0,
  });
}
