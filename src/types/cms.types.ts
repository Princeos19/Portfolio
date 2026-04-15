export const WEBSITE_PAGE_KEYS = ['home', 'about', 'contact'] as const;

export type WebsitePageKey = (typeof WEBSITE_PAGE_KEYS)[number];

export type WebsiteSectionContent = {
  sectionKey: string;
  contentJson: string;
  updatedAt: string | null;
};

export type AdminPageContentResponse = {
  pageKey: WebsitePageKey;
  sections: WebsiteSectionContent[];
};

export type AdminSectionContentResponse = {
  pageKey: WebsitePageKey;
  sectionKey: string;
  contentJson: string;
  updatedAt: string;
};

export type SaveSectionContentRequest = {
  contentJson: string;
};
