import { hashToken } from '../../../_lib/auth';
import { jsonResponse, parseCookieHeader } from '../../../_lib/http';

type SessionEnv = Env;

function isSessionValid(expiresAt: string | null): boolean {
  if (!expiresAt) {
    return false;
  }

  const expiresAtMs = Date.parse(expiresAt);
  return Number.isFinite(expiresAtMs) && expiresAtMs > Date.now();
}

export async function onRequestGet({ request, env }: { request: Request; env: SessionEnv }) {
  const cookies = parseCookieHeader(request.headers.get('cookie'));
  const token = cookies.admin_session;

  if (!token) {
    return jsonResponse({ authenticated: false }, { status: 401 });
  }

  const tokenHash = await hashToken(token);
  const result = await env.DB.prepare(
    'SELECT token_hash, expires_at FROM admin_sessions WHERE token_hash = ? LIMIT 1',
  )
    .bind(tokenHash)
    .first<{ token_hash: string; expires_at: string }>();

  if (!result || result.token_hash !== tokenHash || !isSessionValid(result.expires_at)) {
    return jsonResponse({ authenticated: false }, { status: 401 });
  }

  return jsonResponse({ authenticated: true });
}
