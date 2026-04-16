import { useEffect, useMemo, useState } from 'react';
import { formatFullDate, formatRelativeDate } from '../../../utils/formatDate';

type InquiryStatus = 'new' | 'in-progress' | 'resolved' | 'spam';
type InquiryStatusFilter = InquiryStatus | 'all';
type ArchiveFilter = 'active' | 'archived' | 'all';

type Inquiry = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  sourcePage: string | null;
  status: InquiryStatus;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
};

type InquiryListResponse = {
  inquiries: Inquiry[];
};

type InquiryUpdateResponse = {
  inquiry: Inquiry;
};

const STATUS_OPTIONS: Array<{ value: InquiryStatusFilter; label: string }> = [
  { value: 'all', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'spam', label: 'Spam' },
];

const ARCHIVE_OPTIONS: Array<{ value: ArchiveFilter; label: string }> = [
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' },
  { value: 'all', label: 'All records' },
];

const STATUS_META: Record<
  InquiryStatus,
  {
    label: string;
    className: string;
  }
> = {
  new: {
    label: 'New',
    className: 'bg-[#00daf3]/15 text-[#00daf3] border-[#00daf3]/25',
  },
  'in-progress': {
    label: 'In progress',
    className: 'bg-[#f4b740]/15 text-[#f4b740] border-[#f4b740]/25',
  },
  resolved: {
    label: 'Resolved',
    className: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  },
  spam: {
    label: 'Spam',
    className: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
  },
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
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return (await response.json()) as T;
}

function buildQueryString(statusFilter: InquiryStatusFilter, archiveFilter: ArchiveFilter, searchTerm: string): string {
  const params = new URLSearchParams();

  if (statusFilter !== 'all') {
    params.set('status', statusFilter);
  }

  if (archiveFilter === 'active') {
    params.set('archive', '0');
  } else if (archiveFilter === 'archived') {
    params.set('archive', '1');
  }

  if (searchTerm.trim()) {
    params.set('search', searchTerm.trim());
  }

  return params.toString();
}

function formatArchiveLabel(isArchived: boolean): string {
  return isArchived ? 'Archived' : 'Active';
}

function buildSearchSummary(total: number, filtered: number): string {
  if (total === filtered) {
    return `${total} inquiries`;
  }

  return `${filtered} of ${total} inquiries`;
}

export default function AdminBookingsPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<InquiryStatusFilter>('all');
  const [archiveFilter, setArchiveFilter] = useState<ArchiveFilter>('active');
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [mutatingId, setMutatingId] = useState<number | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearchTerm(searchInput);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setLoadError('');

    const queryString = buildQueryString(statusFilter, archiveFilter, searchTerm);
    const endpoint = queryString ? `/api/admin/inquiries?${queryString}` : '/api/admin/inquiries';

    void requestAdminJson<InquiryListResponse>(endpoint, { signal: controller.signal })
      .then((response) => {
        setInquiries(response.inquiries);
        setSelectedInquiryId((current) => {
          if (current !== null && response.inquiries.some((inquiry) => inquiry.id === current)) {
            return current;
          }

          return response.inquiries[0]?.id ?? null;
        });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setInquiries([]);
        setSelectedInquiryId(null);
        setLoadError(error instanceof Error ? error.message : 'Failed to load inquiries');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [archiveFilter, searchTerm, statusFilter]);

  useEffect(() => {
    if (!selectedInquiryId) {
      return;
    }

    if (!inquiries.some((inquiry) => inquiry.id === selectedInquiryId)) {
      setSelectedInquiryId(inquiries[0]?.id ?? null);
    }
  }, [inquiries, selectedInquiryId]);

  const selectedInquiry = useMemo(
    () => inquiries.find((inquiry) => inquiry.id === selectedInquiryId) ?? null,
    [inquiries, selectedInquiryId],
  );

  const counts = useMemo(
    () => ({
      total: inquiries.length,
      new: inquiries.filter((inquiry) => inquiry.status === 'new' && !inquiry.archived).length,
      archived: inquiries.filter((inquiry) => inquiry.archived).length,
    }),
    [inquiries],
  );

  const refreshSelectedInquiry = (updatedInquiry: Inquiry) => {
    setInquiries((current) =>
      current.map((inquiry) => (inquiry.id === updatedInquiry.id ? updatedInquiry : inquiry)),
    );
  };

  const refetchInquiries = async () => {
    const queryString = buildQueryString(statusFilter, archiveFilter, searchTerm);
    const endpoint = queryString ? `/api/admin/inquiries?${queryString}` : '/api/admin/inquiries';
    const response = await requestAdminJson<InquiryListResponse>(endpoint);

    setInquiries(response.inquiries);
    setSelectedInquiryId((current) => {
      if (current !== null && response.inquiries.some((inquiry) => inquiry.id === current)) {
        return current;
      }

      return response.inquiries[0]?.id ?? null;
    });
  };

  const updateStatus = async (inquiryId: number, nextStatus: InquiryStatus) => {
    setActionError('');
    setActionMessage('');
    setMutatingId(inquiryId);

    try {
      const response = await requestAdminJson<InquiryUpdateResponse>(
        `/api/admin/inquiries/${inquiryId}/status`,
        {
          method: 'PUT',
          body: JSON.stringify({ status: nextStatus }),
        },
      );

      refreshSelectedInquiry(response.inquiry);
      setActionMessage('Status updated.');
      await refetchInquiries();
    } catch (error: unknown) {
      setActionError(error instanceof Error ? error.message : 'Failed to update status');
    } finally {
      setMutatingId(null);
    }
  };

  const toggleArchive = async (inquiryId: number, archived: boolean) => {
    setActionError('');
    setActionMessage('');
    setMutatingId(inquiryId);

    try {
      const response = await requestAdminJson<InquiryUpdateResponse>(
        `/api/admin/inquiries/${inquiryId}/archive`,
        {
          method: 'PUT',
          body: JSON.stringify({ archived }),
        },
      );

      refreshSelectedInquiry(response.inquiry);
      setActionMessage(archived ? 'Inquiry archived.' : 'Inquiry restored.');
      await refetchInquiries();
    } catch (error: unknown) {
      setActionError(error instanceof Error ? error.message : 'Failed to update archive state');
    } finally {
      setMutatingId(null);
    }
  };

  const detailCount = selectedInquiry ? inquiries.filter((inquiry) => inquiry.id === selectedInquiry.id).length : 0;

  return (
    <div className="p-12 space-y-8">
      <header className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <h2 className="text-5xl font-extrabold font-headline tracking-tighter text-on-surface">
              Inquiries Management
            </h2>
            <p className="text-on-surface-variant mt-2 max-w-2xl font-body">
              Review incoming project inquiries, track status changes, and archive records once they are handled.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <div className="rounded-2xl border border-[#3c494c]/15 bg-[#1e2024] px-4 py-3 text-[#e2e2e8]">
              <span className="block text-[10px] uppercase tracking-[0.18em] text-[#bbc9cc]">Loaded</span>
              <span className="block text-lg font-bold">{buildSearchSummary(counts.total, inquiries.length)}</span>
            </div>
            <div className="rounded-2xl border border-[#3c494c]/15 bg-[#1e2024] px-4 py-3 text-[#e2e2e8]">
              <span className="block text-[10px] uppercase tracking-[0.18em] text-[#bbc9cc]">Open</span>
              <span className="block text-lg font-bold">{counts.new}</span>
            </div>
            <div className="rounded-2xl border border-[#3c494c]/15 bg-[#1e2024] px-4 py-3 text-[#e2e2e8]">
              <span className="block text-[10px] uppercase tracking-[0.18em] text-[#bbc9cc]">Archived</span>
              <span className="block text-lg font-bold">{counts.archived}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-4 rounded-2xl border border-[#3c494c]/15 bg-[#1e2024] p-5">
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#bbc9cc]">
              Status
            </span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as InquiryStatusFilter)}
              className="min-w-40 rounded-xl border border-[#3c494c]/20 bg-[#111318] px-4 py-3 text-sm text-[#e2e2e8] outline-none transition-colors focus:border-[#00daf3]"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#bbc9cc]">
              Archive
            </span>
            <select
              value={archiveFilter}
              onChange={(event) => setArchiveFilter(event.target.value as ArchiveFilter)}
              className="min-w-40 rounded-xl border border-[#3c494c]/20 bg-[#111318] px-4 py-3 text-sm text-[#e2e2e8] outline-none transition-colors focus:border-[#00daf3]"
            >
              {ARCHIVE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex min-w-[260px] flex-1 flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#bbc9cc]">
              Search
            </span>
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Name, email, company, or message"
              className="rounded-xl border border-[#3c494c]/20 bg-[#111318] px-4 py-3 text-sm text-[#e2e2e8] outline-none transition-colors placeholder:text-[#6f7b80] focus:border-[#00daf3]"
            />
          </label>
        </div>
      </header>

      {loadError ? (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-200">
          {loadError}
        </div>
      ) : null}

      {actionError ? (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-200">
          {actionError}
        </div>
      ) : null}

      {actionMessage ? (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">
          {actionMessage}
        </div>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="overflow-hidden rounded-3xl border border-[#3c494c]/15 bg-[#1b1d21]">
          <div className="flex items-center justify-between border-b border-[#3c494c]/15 px-5 py-4">
            <div>
              <h3 className="text-lg font-bold text-[#e2e2e8]">Inquiry List</h3>
              <p className="text-sm text-[#bbc9cc]">
                {isLoading ? 'Loading inquiries...' : `${inquiries.length} records shown`}
              </p>
            </div>
            <span className="rounded-full border border-[#00daf3]/20 bg-[#00daf3]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#00daf3]">
              {archiveFilter === 'active' ? 'Active only' : archiveFilter === 'archived' ? 'Archived only' : 'All'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#3c494c]/15 text-left">
              <thead className="bg-[#17191d] text-[10px] uppercase tracking-[0.18em] text-[#bbc9cc]">
                <tr>
                  <th className="px-5 py-4 font-bold">Inquiry</th>
                  <th className="px-5 py-4 font-bold">Status</th>
                  <th className="px-5 py-4 font-bold">Archive</th>
                  <th className="px-5 py-4 font-bold">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3c494c]/10">
                {isLoading ? (
                  <tr>
                    <td className="px-5 py-8 text-sm text-[#bbc9cc]" colSpan={4}>
                      Loading inquiries...
                    </td>
                  </tr>
                ) : inquiries.length === 0 ? (
                  <tr>
                    <td className="px-5 py-8 text-sm text-[#bbc9cc]" colSpan={4}>
                      No inquiries match the current filters.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inquiry) => {
                    const selected = inquiry.id === selectedInquiryId;
                    const statusMeta = STATUS_META[inquiry.status];

                    return (
                      <tr
                        key={inquiry.id}
                        onClick={() => setSelectedInquiryId(inquiry.id)}
                        className={`cursor-pointer transition-colors ${
                          selected ? 'bg-[#00daf3]/10' : 'hover:bg-[#24272d]'
                        }`}
                      >
                        <td className="px-5 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-[#e2e2e8]">{inquiry.name}</span>
                              {inquiry.archived ? (
                                <span className="rounded-full border border-[#3c494c]/20 bg-[#111318] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#bbc9cc]">
                                  Archived
                                </span>
                              ) : null}
                            </div>
                            <p className="text-sm text-[#bbc9cc]">{inquiry.email}</p>
                            <p className="line-clamp-1 text-sm text-[#7f8a8f]">
                              {inquiry.message}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${statusMeta.className}`}
                          >
                            {statusMeta.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-[#e2e2e8]">
                          {formatArchiveLabel(inquiry.archived)}
                        </td>
                        <td className="px-5 py-4 text-sm text-[#bbc9cc]">
                          {formatRelativeDate(inquiry.updatedAt)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="rounded-3xl border border-[#3c494c]/15 bg-[#1b1d21] p-6">
          {selectedInquiry ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-bold text-[#e2e2e8]">{selectedInquiry.name}</h3>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
                      STATUS_META[selectedInquiry.status].className
                    }`}
                  >
                    {STATUS_META[selectedInquiry.status].label}
                  </span>
                </div>
                <p className="text-sm text-[#bbc9cc]">{selectedInquiry.email}</p>
                {selectedInquiry.company ? (
                  <p className="text-sm text-[#bbc9cc]">{selectedInquiry.company}</p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-3 rounded-2xl border border-[#3c494c]/15 bg-[#111318] p-4 text-sm text-[#e2e2e8]">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#7f8a8f]">Source</span>
                  <span>{selectedInquiry.sourcePage ?? 'contact'}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#7f8a8f]">Created</span>
                  <span>{formatFullDate(selectedInquiry.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#7f8a8f]">Updated</span>
                  <span>{formatFullDate(selectedInquiry.updatedAt)}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#7f8a8f]">Archive state</span>
                  <span>{formatArchiveLabel(selectedInquiry.archived)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#bbc9cc]">
                    Status
                  </span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(event) => void updateStatus(selectedInquiry.id, event.target.value as InquiryStatus)}
                    disabled={mutatingId === selectedInquiry.id}
                    className="rounded-xl border border-[#3c494c]/20 bg-[#111318] px-4 py-3 text-sm text-[#e2e2e8] outline-none transition-colors focus:border-[#00daf3] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {STATUS_OPTIONS.filter((option) => option.value !== 'all').map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="button"
                  onClick={() => void toggleArchive(selectedInquiry.id, !selectedInquiry.archived)}
                  disabled={mutatingId === selectedInquiry.id}
                  className="w-full rounded-xl border border-[#3c494c]/20 bg-[#111318] px-4 py-3 text-sm font-bold text-[#e2e2e8] transition-colors hover:border-[#00daf3]/40 hover:text-[#00daf3] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {selectedInquiry.archived ? 'Restore inquiry' : 'Archive inquiry'}
                </button>
              </div>

              <div className="rounded-2xl border border-[#3c494c]/15 bg-[#111318] p-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#bbc9cc]">
                  Message
                </p>
                <p className="whitespace-pre-wrap text-sm leading-7 text-[#e2e2e8]">
                  {selectedInquiry.message}
                </p>
              </div>

              <div className="rounded-2xl border border-[#00daf3]/15 bg-[#00daf3]/8 p-4 text-sm text-[#bbc9cc]">
                {detailCount > 0 ? 'Selected inquiry is visible in the current filter set.' : 'Selected inquiry is outside the current filters.'}
              </div>

              {mutatingId === selectedInquiry.id ? (
                <div className="text-sm text-[#bbc9cc]">Saving changes...</div>
              ) : null}
            </div>
          ) : (
            <div className="flex h-full min-h-[420px] items-center justify-center text-center">
              <div className="max-w-sm space-y-3">
                <span className="material-symbols-outlined text-5xl text-[#00daf3]/50">
                  mail
                </span>
                <h3 className="text-2xl font-bold text-[#e2e2e8]">No inquiry selected</h3>
                <p className="text-sm leading-6 text-[#bbc9cc]">
                  Pick an inquiry from the list to inspect the message and update its status.
                </p>
              </div>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
