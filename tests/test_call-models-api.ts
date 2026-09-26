import { describe, it, expect, vi } from 'vitest';
import { callModelsApi } from '../src/ai-tools/lib/call-models-api';

describe('callModelsApi', () => {
  const mockFetch = vi.fn();

  beforeAll(() => {
    (global as any).fetch = mockFetch;
    process.env.GITHUB_TOKEN = 'test-token';
  });

  it('uses default model when none specified', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'response', role: 'assistant' }, finish_reason: 'stop', index: 0 }]
      })
    });

    const result = await callModelsApi({ messages: [{ role: 'user', content: 'hi' }] }, true);
    expect(result).toBe('response');
  });

  it('throws error on non-ok response with status 401', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      json: async () => ({ error: { message: 'Invalid token' } })
    });

    await expect(callModelsApi({ messages: [{ role: 'user', content: 'hi' }] })).rejects.toThrow(/Check your GITHUB_TOKEN/);
  });

  it('throws error when no choices returned', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [] })
    });

    await expect(callModelsApi({ messages: [{ role: 'user', content: 'hi' }] })).rejects.toThrow(/No response choices/);
  });

  it('cleans code fences from response', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '```js\nconsole.log("hi")\n```', role: 'assistant' }, finish_reason: 'stop', index: 0 }]
      })
    });

    const result = await callModelsApi({ messages: [{ role: 'user', content: 'hi' }] });
    expect(result).toBe('console.log("hi")');
  });
});
