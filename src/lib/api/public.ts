import type { WebsitePageKey } from '../../types/cms.types';

export type PublicPageSectionContent = {
  sectionKey: string;
  contentJson: string;
  updatedAt: string | null;
};

export type PublicPageContentResponse = {
  pageKey: WebsitePageKey;
  sections: PublicPageSectionContent[];
};

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error ?? 'Request failed';
  } catch {
    return 'Request failed';
  }
}

async function requestPublicJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
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

export function getPageContent(pageKey: WebsitePageKey): Promise<PublicPageContentResponse> {
  return requestPublicJson<PublicPageContentResponse>(`/api/public/content/${pageKey}`);
}
