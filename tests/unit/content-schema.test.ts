import { describe, expect, it } from 'vitest';
import { PAGE_SCHEMAS } from '../../functions/_lib/content-schema';

describe('PAGE_SCHEMAS', () => {
  it('includes the fixed page keys', () => {
    expect(Object.keys(PAGE_SCHEMAS).sort()).toEqual(['about', 'contact', 'home']);
  });

  it('matches the expected section lists', () => {
    expect(PAGE_SCHEMAS).toEqual({
      home: ['hero', 'services', 'experience', 'projects', 'reviews', 'cta'],
      about: ['hero', 'bio', 'toolStack', 'skills', 'certifications', 'cta'],
      contact: ['hero', 'contactInfo', 'socialLinks', 'studioBanner'],
    });
  });
});
