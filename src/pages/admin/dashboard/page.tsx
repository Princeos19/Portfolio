import { useEffect, useState } from 'react';
import { AdminShell } from '../../../components/admin/AdminShell';

type DashboardSummary = {
  projectsCount: number;
  inquiriesCount: number;
  newInquiriesCount: number;
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

function SummaryCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-[#d9d2c8] bg-white p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f695f]">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <span className="text-3xl font-semibold tracking-tight text-[#111318]">{value}</span>
        <span className="rounded-full border border-[#d9d2c8] bg-[#f7f2ea] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6f695f]">
          {detail}
        </span>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError('');

    void requestAdminJson<DashboardSummary>('/api/admin/dashboard/summary', {
      signal: controller.signal,
    })
      .then((response) => {
        setSummary(response);
      })
      .catch((caughtError: unknown) => {
        if (caughtError instanceof DOMException && caughtError.name === 'AbortError') {
          return;
        }

        setSummary(null);
        setError(caughtError instanceof Error ? caughtError.message : 'Failed to load dashboard');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <AdminShell
      title="Dashboard"
      subtitle="Live counts for projects and inquiries pulled from the admin data store."
      actions={
        <button
          type="button"
          onClick={() => {
            setIsLoading(true);
            setError('');
            void requestAdminJson<DashboardSummary>('/api/admin/dashboard/summary')
              .then((response) => setSummary(response))
              .catch((caughtError: unknown) => {
                setSummary(null);
                setError(caughtError instanceof Error ? caughtError.message : 'Failed to load dashboard');
              })
              .finally(() => setIsLoading(false));
          }}
          className="inline-flex items-center gap-2 rounded-full border border-[#d9d2c8] bg-white px-4 py-2 text-sm font-semibold text-[#111318] transition-colors hover:bg-[#f4eee5]"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          Refresh
        </button>
      }
    >
      {error ? (
        <div className="mb-5 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {error}
        </div>
      ) : null}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard label="Projects" value={isLoading ? '—' : summary?.projectsCount ?? 0} detail="Total" />
        <SummaryCard
          label="Inquiries"
          value={isLoading ? '—' : summary?.inquiriesCount ?? 0}
          detail="Total"
        />
        <SummaryCard
          label="New inquiries"
          value={isLoading ? '—' : summary?.newInquiriesCount ?? 0}
          detail="Unread"
        />
      </section>

      <div className="mt-6 rounded-2xl border border-[#d9d2c8] bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-[#111318]">Admin summary</h3>
            <p className="mt-1 text-sm leading-6 text-[#5e584f]">
              This view stays intentionally small: counts only, no decorative layers, no extra chrome.
            </p>
          </div>
          <span className="rounded-full border border-[#d9d2c8] bg-[#f7f2ea] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#6f695f]">
            {isLoading ? 'Loading' : 'Ready'}
          </span>
        </div>
      </div>
    </AdminShell>
  );
}
