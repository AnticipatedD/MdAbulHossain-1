import { describe, it, expect } from 'vitest';
import config from '../vitest.config';

describe('vitest.config.ts', () => {
  it('includes src and tests directories', () => {
    expect(config.test?.include).toContain('src/**/tests/*.ts');
    expect(config.test?.include).toContain('tests/**/*.ts');
  });

  it('enforces coverage thresholds', () => {
    expect(config.test?.coverage?.thresholds?.lines).toBeGreaterThanOrEqual(50);
    expect(config.test?.coverage?.thresholds?.functions).toBeGreaterThanOrEqual(50);
    expect(config.test?.coverage?.thresholds?.branches).toBeGreaterThanOrEqual(50);
    expect(config.test?.coverage?.thresholds?.statements).toBeGreaterThanOrEqual(50);
  });
});
