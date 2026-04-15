import { PAGE_SCHEMAS } from './content-schema';

type KnownPageKey = keyof typeof PAGE_SCHEMAS;
type KnownSectionKey = (typeof PAGE_SCHEMAS)[KnownPageKey][number];

export function assertKnownPage(pageKey: string): asserts pageKey is KnownPageKey {
  if (!(pageKey in PAGE_SCHEMAS)) {
    throw new Error('Unknown page');
  }
}

export function assertKnownPageAndSection(pageKey: string, sectionKey: string): void {
  assertKnownPage(pageKey);

  const sections = PAGE_SCHEMAS[pageKey];
  if (!sections.includes(sectionKey as KnownSectionKey)) {
    throw new Error('Unknown section');
  }
}
