import { hashToken } from '../../../_lib/auth';
import { verifyPasswordInput } from '../../../_lib/env';
import { jsonResponse, parseCookieHeader, readJsonBody } from '../../../_lib/http';

type PasswordBody = {
  password?: string;
  confirmPassword?: string;
};

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
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

  const body = await readJsonBody<PasswordBody>(request);

  let password: string;
  let confirmPassword: string;

  try {
    password = verifyPasswordInput(body?.password ?? '');
    confirmPassword = verifyPasswordInput(body?.confirmPassword ?? '');
  } catch {
    return jsonResponse({ error: 'Password is required' }, { status: 400 });
  }

  if (password !== confirmPassword) {
    return jsonResponse({ error: 'Passwords do not match' }, { status: 400 });
  }

  const updatedAt = new Date().toISOString();

  await env.DB.prepare(
    `
      INSERT INTO site_settings (key, value_json, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(key)
      DO UPDATE SET
        value_json = excluded.value_json,
        updated_at = excluded.updated_at
    `,
  )
    .bind('admin_password', JSON.stringify({ password }), updatedAt)
    .run();

  return jsonResponse({ ok: true, updatedAt });
}
