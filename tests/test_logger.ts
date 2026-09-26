import { describe, it, expect, vi } from 'vitest';
import { createLogger } from '../src/ai-tools/lib/logger';

describe('createLogger', () => {
  it('creates a logger with info, warn, and error methods', () => {
    const logger = createLogger('test');
    expect(logger).toHaveProperty('info');
    expect(logger).toHaveProperty('warn');
    expect(logger).toHaveProperty('error');
  });

  it('logs messages with namespace and level', () => {
    const logger = createLogger('unit');
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    logger.info('hello world');
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('[unit] [INFO] hello world'));

    spy.mockRestore();
  });

  it('logs meta objects as JSON', () => {
    const logger = createLogger('meta');
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    logger.warn('with meta', { foo: 'bar' });
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('"foo":"bar"'));

    spy.mockRestore();
  });

  it('logs errors with proper level', () => {
    const logger = createLogger('errors');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    logger.error('something went wrong');
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('[errors] [ERROR] something went wrong'));

    spy.mockRestore();
  });
});
