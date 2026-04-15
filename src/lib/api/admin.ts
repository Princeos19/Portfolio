import type {
  AdminPageContentResponse,
  AdminSectionContentResponse,
  SaveSectionContentRequest,
  WebsitePageKey,
} from '../../types/cms.types';

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error ?? 'Request failed';
  } catch {
    return 'Request failed';
  }
}

async function requestAdminJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
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

export function getAdminPageContent(pageKey: WebsitePageKey): Promise<AdminPageContentResponse> {
  return requestAdminJson<AdminPageContentResponse>(`/api/admin/content/${pageKey}`);
}

export function getAdminPageContentWithSignal(
  pageKey: WebsitePageKey,
  signal?: AbortSignal,
): Promise<AdminPageContentResponse> {
  return requestAdminJson<AdminPageContentResponse>(`/api/admin/content/${pageKey}`, { signal });
}

export function saveAdminSectionContent(
  pageKey: WebsitePageKey,
  sectionKey: string,
  contentJson: string,
): Promise<AdminSectionContentResponse> {
  const body: SaveSectionContentRequest = { contentJson };

  return requestAdminJson<AdminSectionContentResponse>(
    `/api/admin/content/${pageKey}/${sectionKey}`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
    },
  );
}
