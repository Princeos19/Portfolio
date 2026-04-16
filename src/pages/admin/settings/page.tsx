import { useState, type FormEvent } from 'react';
import { AdminShell } from '../../../components/admin/AdminShell';

type SettingsPasswordResponse = {
  ok?: boolean;
  updatedAt?: string;
  error?: string;
};

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error ?? 'Request failed';
  } catch {
    return 'Request failed';
  }
}

async function requestAdminJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    credentials: 'same-origin',
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      ...(init?.body instanceof FormData ? {} : { 'content-type': 'application/json' }),
    },
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return (await response.json()) as T;
}

export default function AdminSettingsPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setIsSaving(true);

    try {
      const response = await requestAdminJson<SettingsPasswordResponse>('/api/admin/settings/password', {
        method: 'POST',
        body: JSON.stringify({ password, confirmPassword }),
      });

      if (!response.ok) {
        setError('Password update failed');
        return;
      }

      setPassword('');
      setConfirmPassword('');
      setMessage('Password setting saved');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Password update failed');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminShell
      title="Settings"
      subtitle="Minimal admin controls for password management."
    >
      <div className="max-w-2xl rounded-2xl border border-[#d9d2c8] bg-white p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#111318]">Update admin password</h3>
          <p className="mt-1 text-sm leading-6 text-[#5e584f]">
            Saves the new value into `site_settings` under `admin_password` as the V1 minimal flow.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f695f]">
              New password
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-[#d9d2c8] bg-[#f7f2ea] px-4 py-3 text-sm text-[#111318] outline-none transition-colors placeholder:text-[#8e877c] focus:border-[#111318]"
              placeholder="Enter new password"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f695f]">
              Confirm password
            </span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-xl border border-[#d9d2c8] bg-[#f7f2ea] px-4 py-3 text-sm text-[#111318] outline-none transition-colors placeholder:text-[#8e877c] focus:border-[#111318]"
              placeholder="Confirm new password"
            />
          </label>

          {error ? (
            <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111318] px-5 py-3 text-sm font-semibold text-[#f7f2ea] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            {isSaving ? 'Saving...' : 'Save password setting'}
          </button>
        </form>
      </div>
    </AdminShell>
  );
}
