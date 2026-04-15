import { useEffect, useRef, useState } from 'react';
import { SectionAccordion } from '../../../components/admin/SectionAccordion';
import {
  getAdminPageContentWithSignal,
  saveAdminSectionContent,
} from '../../../lib/api/admin';
import { WEBSITE_PAGE_KEYS, type WebsitePageKey } from '../../../types/cms.types';

type SectionEditorState = {
  contentJson: string;
  savedContentJson: string;
  updatedAt: string | null;
  status: 'idle' | 'saving' | 'saved' | 'error';
  error: string | null;
};

function formatJsonText(contentJson: string): string {
  try {
    return JSON.stringify(JSON.parse(contentJson), null, 2);
  } catch {
    return contentJson;
  }
}

function formatUpdatedAt(updatedAt: string | null): string {
  if (!updatedAt) {
    return 'Not saved yet';
  }

  const date = new Date(updatedAt);
  return Number.isNaN(date.getTime()) ? 'Not saved yet' : `Saved ${date.toLocaleString()}`;
}

export default function AdminWebsitePage() {
  const [pageKey, setPageKey] = useState<WebsitePageKey>('home');
  const [sections, setSections] = useState<Record<string, SectionEditorState>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const currentPageKeyRef = useRef(pageKey);

  useEffect(() => {
    currentPageKeyRef.current = pageKey;
  }, [pageKey]);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setLoadError('');

    void getAdminPageContentWithSignal(pageKey, controller.signal)
      .then((response) => {
        const nextSections = Object.fromEntries(
          response.sections.map((section) => [
            section.sectionKey,
            {
              contentJson: formatJsonText(section.contentJson),
              savedContentJson: formatJsonText(section.contentJson),
              updatedAt: section.updatedAt,
              status: 'idle' as const,
              error: null,
            },
          ]),
        ) as Record<string, SectionEditorState>;

        setSections(nextSections);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setSections({});
        setLoadError(error instanceof Error ? error.message : 'Failed to load page content');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [pageKey]);

  const handleContentChange = (sectionKey: string, value: string) => {
    setSections((current) => ({
      ...current,
      [sectionKey]: {
        ...(current[sectionKey] ?? {
          contentJson: '',
          savedContentJson: '',
          updatedAt: null,
          status: 'idle' as const,
          error: null,
        }),
        contentJson: value,
        status: 'idle',
        error: null,
      },
    }));
  };

  const handleSaveSection = async (sectionKey: string) => {
    const currentSection = sections[sectionKey];
    if (!currentSection) {
      return;
    }

    const requestPageKey = pageKey;
    let normalizedContentJson: string;
    try {
      normalizedContentJson = JSON.stringify(JSON.parse(currentSection.contentJson), null, 2);
    } catch {
      setSections((current) => ({
        ...current,
        [sectionKey]: {
          ...(current[sectionKey] ?? {
            contentJson: currentSection.contentJson,
            savedContentJson: currentSection.savedContentJson,
            updatedAt: currentSection.updatedAt,
            status: 'idle' as const,
            error: null,
          }),
          status: 'error',
          error: 'Invalid JSON',
        },
      }));
      return;
    }

    setSections((current) => ({
      ...current,
      [sectionKey]: {
        ...(current[sectionKey] ?? {
          contentJson: currentSection.contentJson,
          savedContentJson: currentSection.savedContentJson,
          updatedAt: currentSection.updatedAt,
          status: 'idle' as const,
          error: null,
        }),
        status: 'saving',
        error: null,
      },
    }));

    try {
      const saved = await saveAdminSectionContent(requestPageKey, sectionKey, normalizedContentJson);

      if (currentPageKeyRef.current !== requestPageKey) {
        return;
      }

      const formattedContent = formatJsonText(saved.contentJson);

      setSections((current) => ({
        ...current,
        [sectionKey]: {
          contentJson: formattedContent,
          savedContentJson: formattedContent,
          updatedAt: saved.updatedAt,
          status: 'saved',
          error: null,
        },
      }));
    } catch (error: unknown) {
      if (currentPageKeyRef.current !== requestPageKey) {
        return;
      }

      setSections((current) => ({
        ...current,
        [sectionKey]: {
          ...(current[sectionKey] ?? {
            contentJson: currentSection.contentJson,
            savedContentJson: currentSection.savedContentJson,
            updatedAt: currentSection.updatedAt,
            status: 'idle' as const,
            error: null,
          }),
          status: 'error',
          error: error instanceof Error ? error.message : 'Failed to save section',
        },
      }));
    }
  };

  return (
    <div className="p-12 space-y-8">
      <header className="space-y-4">
        <div>
          <h2 className="text-5xl font-extrabold font-headline tracking-tighter text-on-surface">
            Website Content
          </h2>
          <p className="text-on-surface-variant mt-2 max-w-2xl font-body">
            Edit the home, about, and contact pages section by section without leaving the page.
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-4 rounded-2xl border border-[#3c494c]/15 bg-[#1e2024] p-5">
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#bbc9cc]">
              Page
            </span>
            <select
              value={pageKey}
              onChange={(event) => setPageKey(event.target.value as WebsitePageKey)}
              className="min-w-40 rounded-xl border border-[#3c494c]/20 bg-[#111318] px-4 py-3 text-sm text-[#e2e2e8] outline-none transition-colors focus:border-[#00daf3]"
            >
              {WEBSITE_PAGE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>

          <div className="text-sm text-[#bbc9cc]">
            {isLoading ? 'Loading sections...' : `${Object.keys(sections).length} sections ready`}
          </div>
        </div>
      </header>

      {loadError ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-200">
          {loadError}
        </div>
      ) : null}

      <div className="space-y-4">
        {Object.entries(sections).map(([sectionKey, section]) => {
          const isDirty = section.contentJson !== section.savedContentJson;

          return (
            <SectionAccordion
              key={sectionKey}
              title={sectionKey}
              subtitle={`${formatUpdatedAt(section.updatedAt)}${isDirty ? ' • Unsaved changes' : ''}`}
            >
              <div className="space-y-4">
                <div className="rounded-xl border border-[#3c494c]/15 bg-[#111318] p-4">
                  <textarea
                    value={section.contentJson}
                    onChange={(event) => handleContentChange(sectionKey, event.target.value)}
                    spellCheck={false}
                    rows={12}
                    className="min-h-[260px] w-full resize-y rounded-lg border border-[#3c494c]/20 bg-transparent px-4 py-3 font-mono text-sm leading-6 text-[#e2e2e8] outline-none placeholder:text-[#bbc9cc]/40 focus:border-[#00daf3]"
                    placeholder='{\n  "headline": "Enter JSON content"\n}'
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => void handleSaveSection(sectionKey)}
                    disabled={section.status === 'saving' || !isDirty}
                    className="rounded-full bg-[#00daf3] px-5 py-3 text-sm font-bold text-[#111318] transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {section.status === 'saving' ? 'Saving...' : 'Save section'}
                  </button>

                  <span className="text-xs text-[#bbc9cc]">
                    {section.status === 'saved' ? 'Saved' : isDirty ? 'Pending changes' : 'Up to date'}
                  </span>

                  {section.error ? (
                    <span className="text-xs text-red-300">{section.error}</span>
                  ) : null}
                </div>
              </div>
            </SectionAccordion>
          );
        })}
      </div>
    </div>
  );
}
