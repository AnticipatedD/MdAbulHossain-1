import { describe, it, expect } from 'vitest';
import { createLogger } from '../src/ai-tools/lib/logger';

describe('createLogger', () => {
  it('creates a logger with a namespace', () => {
    const logger = createLogger('test');
    expect(logger).toHaveProperty('info');
    expect(logger).toHaveProperty('warn');
    expect(logger).toHaveProperty('error');
  });
});
