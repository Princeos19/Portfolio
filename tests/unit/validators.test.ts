import { describe, expect, it } from 'vitest';
import { assertKnownPageAndSection } from '../../functions/_lib/validators';

describe('assertKnownPageAndSection', () => {
  it('throws for an unknown section', () => {
    expect(() => assertKnownPageAndSection('home', 'unknown')).toThrowError('Unknown section');
  });
});
