export const PAGE_SCHEMAS = {
  home: ['hero', 'services', 'experience', 'projects', 'reviews', 'cta'],
  about: ['hero', 'bio', 'toolStack', 'skills', 'certifications', 'cta'],
  contact: ['hero', 'contactInfo', 'socialLinks', 'studioBanner'],
} as const;

export type PageKey = keyof typeof PAGE_SCHEMAS;
