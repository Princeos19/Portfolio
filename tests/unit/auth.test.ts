import { describe, expect, it } from 'vitest';
import { hashToken } from '../../functions/_lib/auth';

describe('hashToken', () => {
  it('returns a deterministic lowercase SHA-256 hex digest', async () => {
    const token = 'prince-portfolio-token';

    const first = await hashToken(token);
    const second = await hashToken(token);

    expect(first).toBe('cc297cecce11e90a2b7ad30e8a5d48982e333dbb355b4e3261ba87844f67d501');
    expect(second).toBe(first);
    expect(first).toHaveLength(64);
    expect(first).toMatch(/^[0-9a-f]{64}$/);
  });

  it('handles an empty token deterministically', async () => {
    const hash = await hashToken('');

    expect(hash).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });
});
