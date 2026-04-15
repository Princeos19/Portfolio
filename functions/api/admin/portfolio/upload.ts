import { hashToken } from '../../../_lib/auth';
import { jsonResponse, parseCookieHeader } from '../../../_lib/http';

type AdminEnv = Env;

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

function buildFileKey(filename: string): string {
  const safeName = filename
    .trim()
    .toLowerCase()
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') || 'upload';

  return `portfolio/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
}

export async function onRequestPost({ request, env }: { request: Request; env: AdminEnv }) {
  const authError = await requireAdminSession(request, env);
  if (authError) {
    return authError;
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return jsonResponse({ error: 'file is required' }, { status: 400 });
  }

  if (!file.type.startsWith('image/')) {
    return jsonResponse({ error: 'Only image uploads are allowed' }, { status: 400 });
  }

  const maxSizeBytes = 10 * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return jsonResponse({ error: 'File too large' }, { status: 413 });
  }

  const key = buildFileKey(file.name);
  await env.R2_ASSETS.put(key, await file.arrayBuffer(), {
    httpMetadata: file.type ? { contentType: file.type } : undefined,
  });

  return jsonResponse({
    key,
    url: new URL(`/assets/${key}`, request.url).toString(),
  });
}
