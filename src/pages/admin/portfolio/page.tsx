import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminShell } from '../../../components/admin/AdminShell';

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

function formatDate(value: string | null): string {
  if (!value) {
    return 'Never';
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Never' : date.toLocaleString();
}

function formatStatus(status: string): string {
  return status
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const hasLoaded = !isLoading && !error;

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError('');

    void requestAdminJson<{ projects: PortfolioProject[] }>('/api/admin/portfolio/projects', {
      signal: controller.signal,
    })
      .then((response) => {
        setProjects(response.projects);
      })
      .catch((caughtError: unknown) => {
        if (caughtError instanceof DOMException && caughtError.name === 'AbortError') {
          return;
        }

        setError(caughtError instanceof Error ? caughtError.message : 'Failed to load projects');
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

  const filteredProjects = useMemo(() => {
    const needle = search.trim().toLowerCase();

    if (!needle) {
      return projects;
    }

    return projects.filter((project) => {
      const haystack = [
        project.title,
        project.slug,
        project.summary,
        project.status,
        project.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [projects, search]);

  return (
    <AdminShell
      title="Portfolio Projects"
      subtitle="Browse, filter, and open projects for editing. Use the create action to add a new case study."
      actions={
        <Link
          to="/admin/portfolio/new"
          className="inline-flex items-center gap-2 rounded-full bg-[#111318] px-5 py-3 text-sm font-bold text-[#f7f2ea] transition-transform hover:scale-[1.01] active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New project
        </Link>
      }
    >
      <div className="space-y-5">
        <div className="flex flex-col gap-4 rounded-2xl border border-[#d9d2c8] bg-[#fffdf8] p-4 md:flex-row md:items-end md:justify-between">
          <label className="flex w-full max-w-xl flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f695f]">
              Search
            </span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Title, slug, summary, status, or tags"
              className="rounded-xl border border-[#d9d2c8] bg-[#f7f2ea] px-4 py-3 text-sm text-[#111318] outline-none transition-colors placeholder:text-[#8e877c] focus:border-[#111318]"
            />
          </label>

          <div className="text-sm text-[#5e584f]">
            {isLoading ? 'Loading projects...' : `${filteredProjects.length} of ${projects.length} projects`}
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-8 text-center">
            <p className="text-sm font-semibold text-red-900">Failed to load projects</p>
            <p className="mt-2 text-sm text-red-800">{error}</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#d9d2c8] bg-[#fffdf8]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#e7dfd4]">
                <thead className="bg-[#f4eee5]">
                  <tr className="text-left text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f695f]">
                    <th className="px-4 py-3">Project</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Tags</th>
                    <th className="px-4 py-3">Updated</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efe8dd]">
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="align-top">
                      <td className="px-4 py-4">
                        <div className="flex items-start gap-3">
                          <div className="h-14 w-14 overflow-hidden rounded-xl border border-[#e7dfd4] bg-[#f4eee5]">
                            {project.coverImageUrl ? (
                              <img
                                src={project.coverImageUrl}
                                alt={project.title}
                                className="h-full w-full object-cover"
                              />
                            ) : null}
                          </div>
                          <div className="min-w-0 space-y-1">
                            <div className="font-semibold text-[#111318]">{project.title}</div>
                            <div className="text-xs text-[#6f695f]">/{project.slug}</div>
                            <p className="max-w-2xl text-sm leading-6 text-[#5e584f]">
                              {project.summary}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#111318]">
                        <span className="inline-flex rounded-full border border-[#d9d2c8] bg-[#f4eee5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]">
                          {formatStatus(project.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.length > 0 ? (
                            project.tags.map((tag) => (
                              <span
                                key={`${project.id}-${tag}`}
                                className="rounded-full border border-[#d9d2c8] bg-white px-3 py-1 text-xs text-[#5e584f]"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-[#8e877c]">No tags</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#5e584f]">
                        {formatDate(project.updatedAt)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Link
                          to={`/admin/portfolio/${project.id}`}
                          className="inline-flex items-center gap-2 rounded-full border border-[#111318] px-4 py-2 text-sm font-semibold text-[#111318] transition-colors hover:bg-[#111318] hover:text-[#f7f2ea]"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}

                  {hasLoaded && filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center">
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-[#111318]">No projects found</p>
                          <p className="text-sm text-[#5e584f]">
                            Try a different search term or create a new project.
                          </p>
                          <Link
                            to="/admin/portfolio/new"
                            className="inline-flex items-center gap-2 rounded-full bg-[#111318] px-5 py-3 text-sm font-bold text-[#f7f2ea]"
                          >
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            New project
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
