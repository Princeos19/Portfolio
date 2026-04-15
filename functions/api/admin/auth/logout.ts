import { hashToken } from '../../../../_lib/auth';
import { jsonResponse, parseCookieHeader } from '../../../../_lib/http';

const EXPIRED_COOKIE = 'admin_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0';

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  const cookies = parseCookieHeader(request.headers.get('cookie'));
  const token = cookies.admin_session;

  if (token) {
    try {
      const tokenHash = await hashToken(token);
      await env.DB.prepare('DELETE FROM admin_sessions WHERE token_hash = ?').bind(tokenHash).run();
    } catch {
      // Best effort only; logout still succeeds if DB cleanup fails.
    }
  }

  return jsonResponse(
    { ok: true },
    {
      headers: {
        'Set-Cookie': EXPIRED_COOKIE,
      },
    },
  );
}
