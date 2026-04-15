import { describe, expect, it } from 'vitest';
import { assertKnownPageAndSection, normalizeSlug } from '../../functions/_lib/validators';

describe('assertKnownPageAndSection', () => {
  it('throws for an unknown section', () => {
    expect(() => assertKnownPageAndSection('home', 'unknown')).toThrowError('Unknown section');
  });
});

describe('normalizeSlug', () => {
  it('normalizes a title into a slug', () => {
    expect(normalizeSlug('My New Project')).toBe('my-new-project');
  });
});
