import { hashToken } from '../../../../_lib/auth';
import { verifyPasswordInput } from '../../../../_lib/env';
import { jsonResponse, readJsonBody } from '../../../../_lib/http';

type AdminAuthEnv = Env & {
  ADMIN_PASSWORD: string;
};

type LoginBody = {
  password?: string;
};

type SiteSettingRow = {
  value_json: string;
};

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function buildSessionCookie(token: string): string {
  return `admin_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${COOKIE_MAX_AGE}`;
}

export async function onRequestPost({ request, env }: { request: Request; env: AdminAuthEnv }) {
  let password: string;

  try {
    const body = await readJsonBody<LoginBody>(request);
    password = verifyPasswordInput(body?.password ?? '');
  } catch {
    return jsonResponse({ error: 'Invalid credentials' }, { status: 401 });
  }

  let expectedPassword = env.ADMIN_PASSWORD;

  const setting = await env.DB.prepare('SELECT value_json FROM site_settings WHERE key = ? LIMIT 1')
    .bind('admin_password')
    .first<SiteSettingRow>();

  if (setting) {
    try {
      const parsed = JSON.parse(setting.value_json) as { password?: unknown };
      if (typeof parsed.password === 'string' && parsed.password.trim() !== '') {
        expectedPassword = parsed.password;
      }
    } catch {
      // Fall back to env.ADMIN_PASSWORD when the stored setting is invalid.
    }
  }

  if (password !== expectedPassword) {
    return jsonResponse({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = crypto.randomUUID();
  const tokenHash = await hashToken(token);
  const now = new Date().toISOString();

  try {
    await env.DB.prepare(
      'INSERT INTO admin_sessions (id, token_hash, created_at, expires_at, last_seen_at, ip, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)',
    )
      .bind(
        crypto.randomUUID(),
        tokenHash,
        now,
        new Date(Date.now() + COOKIE_MAX_AGE * 1000).toISOString(),
        now,
        request.headers.get('cf-connecting-ip'),
        request.headers.get('user-agent'),
      )
      .run();
  } catch {
    return jsonResponse({ error: 'Session persistence failed' }, { status: 500 });
  }

  return jsonResponse(
    { ok: true },
    {
      headers: {
        'Set-Cookie': buildSessionCookie(token),
      },
    },
  );
}
