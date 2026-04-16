import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AdminShell } from '../../../../components/admin/AdminShell';
import { SectionAccordion } from '../../../../components/admin/SectionAccordion';

type PortfolioProject = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  status: string;
  tags: string[];
  coverImageUrl: string | null;
  publishedAt: string | null;
  updatedAt: string;
};

type ProjectFormState = {
  title: string;
  slug: string;
  summary: string;
  status: string;
  tags: string;
  coverImageUrl: string;
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

function toTagsText(tags: string[]): string {
  return tags.join(', ');
}

function parseTagsText(tags: string): string[] {
  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

function createEmptyForm(): ProjectFormState {
  return {
    title: '',
    slug: '',
    summary: '',
    status: 'draft',
    tags: '',
    coverImageUrl: '',
  };
}

export default function AdminPortfolioDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const [form, setForm] = useState<ProjectFormState>(createEmptyForm);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [loadError, setLoadError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const isBlockingLoadFailure = !isNew && !isLoading && Boolean(loadError);
  const isBusy = isSaving || isDeleting || isUploading || isBlockingLoadFailure;

  useEffect(() => {
    if (isNew || !id) {
      setForm(createEmptyForm());
      setIsLoading(false);
      setLoadError('');
      return;
    }

    const controller = new AbortController();

    setIsLoading(true);
    setLoadError('');
    setError('');
    setInfo('');

    void requestAdminJson<{ project: PortfolioProject }>(`/api/admin/portfolio/projects/${id}`, {
      signal: controller.signal,
    })
      .then((response) => {
        const project = response.project;

        setForm({
          title: project.title,
          slug: project.slug,
          summary: project.summary,
          status: project.status,
          tags: toTagsText(project.tags),
          coverImageUrl: project.coverImageUrl ?? '',
        });
        setLoadError('');
      })
      .catch((caughtError: unknown) => {
        if (caughtError instanceof DOMException && caughtError.name === 'AbortError') {
          return;
        }

        setLoadError(caughtError instanceof Error ? caughtError.message : 'Failed to load project');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [id, isNew]);

  const pageTitle = useMemo(() => (isNew ? 'Create Portfolio Project' : 'Edit Portfolio Project'), [isNew]);

  const updateField = (field: keyof ProjectFormState, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const uploadCoverImage = async (file: File) => {
    setError('');
    setInfo('');
    setIsUploading(true);

    const payload = new FormData();
    payload.append('file', file);

    try {
      const response = await requestAdminJson<{ url: string }>('/api/admin/portfolio/upload', {
        method: 'POST',
        body: payload,
      });

      setForm((current) => ({
        ...current,
        coverImageUrl: response.url,
      }));
      setInfo('Cover image uploaded.');
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (isBusy) {
      return;
    }

    setIsSaving(true);
    setError('');
    setInfo('');

    const body = {
      title: form.title.trim(),
      slug: form.slug.trim() || undefined,
      summary: form.summary.trim(),
      status: form.status.trim() || 'draft',
      tags: parseTagsText(form.tags),
      coverImageUrl: form.coverImageUrl.trim() || null,
    };

    try {
      if (isNew) {
        const response = await requestAdminJson<{ project: PortfolioProject }>('/api/admin/portfolio/projects', {
          method: 'POST',
          body: JSON.stringify(body),
        });

        navigate(`/admin/portfolio/${response.project.id}`, { replace: true });
        return;
      }

      if (!id) {
        throw new Error('Missing project id');
      }

      const response = await requestAdminJson<{ project: PortfolioProject }>(`/api/admin/portfolio/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });

      setForm({
        title: response.project.title,
        slug: response.project.slug,
        summary: response.project.summary,
        status: response.project.status,
        tags: toTagsText(response.project.tags),
        coverImageUrl: response.project.coverImageUrl ?? '',
      });
      setInfo('Project saved.');
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : 'Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (isNew || !id || isBusy) {
      return;
    }

    const confirmed = window.confirm('Delete this project permanently?');
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setError('');
    setInfo('');

    try {
      await requestAdminJson<{ ok: boolean }>(`/api/admin/portfolio/projects/${id}`, {
        method: 'DELETE',
      });
      navigate('/admin/portfolio');
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : 'Failed to delete project');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminShell
      title={pageTitle}
      subtitle={
        isNew
          ? 'Create a new portfolio entry, upload a cover image, and organize tags before publishing.'
          : 'Edit an existing portfolio entry. Save changes, upload a new cover image, or remove the project.'
      }
      actions={
        <>
      <Link
            to="/admin/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-[#111318] px-4 py-2 text-sm font-semibold text-[#111318] transition-colors hover:bg-[#111318] hover:text-[#f7f2ea]"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back
          </Link>
          {!isNew ? (
            <button
              type="button"
              onClick={() => void handleDelete()}
              disabled={isDeleting || isUploading || isBlockingLoadFailure}
              className="inline-flex items-center gap-2 rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-800 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={isSaving || isLoading || isUploading || isBlockingLoadFailure}
            className="inline-flex items-center gap-2 rounded-full bg-[#111318] px-5 py-3 text-sm font-bold text-[#f7f2ea] transition-transform hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </>
      }
    >
      {isBlockingLoadFailure ? (
        <div className="rounded-2xl border border-red-300 bg-red-50 px-5 py-8 text-center">
          <p className="text-sm font-semibold text-red-900">Project could not be loaded</p>
          <p className="mt-2 text-sm text-red-800">{loadError}</p>
          <div className="mt-4">
            <Link
              to="/admin/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-900 transition-colors hover:bg-red-100"
            >
              Return to portfolio
            </Link>
          </div>
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-2xl border border-[#d9d2c8] bg-[#fffdf8] px-5 py-6 text-sm text-[#5e584f]">
          Loading project...
        </div>
      ) : null}

      {error ? (
        <div className="mt-4 rounded-2xl border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      {info ? (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
          {info}
        </div>
      ) : null}

      {!isLoading && !isBlockingLoadFailure ? (
        <div className="mt-5 space-y-5">
          <section className="grid gap-5 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="rounded-2xl border border-[#d9d2c8] bg-[#fffdf8] p-5">
              <div className="space-y-4">
                <label className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f695f]">
                    Title
                  </span>
                  <input
                    value={form.title}
                    onChange={(event) => updateField('title', event.target.value)}
                    className="rounded-xl border border-[#d9d2c8] bg-[#f7f2ea] px-4 py-3 text-sm text-[#111318] outline-none transition-colors focus:border-[#111318]"
                    placeholder="Project title"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f695f]">
                    Slug
                  </span>
                  <input
                    value={form.slug}
                    onChange={(event) => updateField('slug', event.target.value)}
                    className="rounded-xl border border-[#d9d2c8] bg-[#f7f2ea] px-4 py-3 text-sm text-[#111318] outline-none transition-colors placeholder:text-[#8e877c] focus:border-[#111318]"
                    placeholder="leave blank to auto-generate from title"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f695f]">
                    Summary
                  </span>
                  <textarea
                    value={form.summary}
                    onChange={(event) => updateField('summary', event.target.value)}
                    rows={10}
                    className="min-h-56 rounded-xl border border-[#d9d2c8] bg-[#f7f2ea] px-4 py-3 text-sm leading-6 text-[#111318] outline-none transition-colors placeholder:text-[#8e877c] focus:border-[#111318]"
                    placeholder="Short project summary"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-[#d9d2c8] bg-[#fffdf8] p-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f695f]">
                        Cover image
                      </p>
                      <p className="mt-1 text-xs text-[#5e584f]">
                        Upload an image or paste a direct asset URL.
                      </p>
                    </div>
                    {form.coverImageUrl ? (
                      <button
                        type="button"
                        onClick={() => updateField('coverImageUrl', '')}
                        className="text-xs font-semibold text-[#111318] underline decoration-[#111318]/30 underline-offset-4"
                      >
                        Clear
                      </button>
                    ) : null}
                  </div>

                  <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[#111318] px-4 py-3 text-sm font-semibold text-[#111318] transition-colors hover:bg-[#111318] hover:text-[#f7f2ea]">
                    <span className="material-symbols-outlined text-[18px]">upload</span>
                    {isUploading ? 'Uploading...' : 'Upload image'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading || isBusy}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (!file) {
                          return;
                        }

                        void uploadCoverImage(file);
                        event.target.value = '';
                      }}
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f695f]">
                      Cover image URL
                    </span>
                    <input
                      value={form.coverImageUrl}
                      onChange={(event) => updateField('coverImageUrl', event.target.value)}
                      className="rounded-xl border border-[#d9d2c8] bg-[#f7f2ea] px-4 py-3 text-sm text-[#111318] outline-none transition-colors placeholder:text-[#8e877c] focus:border-[#111318]"
                      placeholder="https://..."
                    />
                  </label>

                  {form.coverImageUrl ? (
                    <div className="overflow-hidden rounded-2xl border border-[#d9d2c8] bg-[#f4eee5]">
                      <img
                        src={form.coverImageUrl}
                        alt={form.title || 'Cover preview'}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-[#d9d2c8] bg-[#f4eee5] px-4 py-10 text-center text-sm text-[#8e877c]">
                      No cover image yet
                    </div>
                  )}
                </div>
              </div>

              <SectionAccordion
                title="Metadata + tags"
                subtitle="Use this section for publication state and structured labels."
                defaultOpen
              >
                <div className="space-y-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#bbc9cc]">
                      Status
                    </span>
                    <select
                      value={form.status}
                      onChange={(event) => updateField('status', event.target.value)}
                      disabled={isBusy}
                      className="rounded-xl border border-[#3c494c]/20 bg-[#111318] px-4 py-3 text-sm text-[#e2e2e8] outline-none transition-colors focus:border-[#00daf3]"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#bbc9cc]">
                      Tags
                    </span>
                    <textarea
                      value={form.tags}
                      onChange={(event) => updateField('tags', event.target.value)}
                      disabled={isBusy}
                      rows={5}
                      className="rounded-xl border border-[#3c494c]/20 bg-[#111318] px-4 py-3 text-sm leading-6 text-[#e2e2e8] outline-none transition-colors placeholder:text-[#bbc9cc]/40 focus:border-[#00daf3]"
                      placeholder="design system, case study, mobile app"
                    />
                  </label>
                </div>
              </SectionAccordion>
            </div>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#d9d2c8] bg-[#fffdf8] px-5 py-4 text-sm text-[#5e584f]">
            <div>Save to persist changes. The slug will auto-generate if left blank.</div>
            <div className="flex flex-wrap gap-2">
              {form.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean)
                .slice(0, 6)
                .map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#d9d2c8] bg-[#f4eee5] px-3 py-1 text-xs text-[#5e584f]"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>
      ) : null}
    </AdminShell>
  );
}
