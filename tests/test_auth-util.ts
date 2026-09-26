import { describe, it, expect, vi } from 'vitest';
import { ensureGitHubToken } from '../src/ai-tools/lib/auth-utils';
import { execSync } from 'child_process';

vi.mock('child_process', () => ({
  execSync: vi.fn()
}));

describe('auth-utils', () => {
  it('uses existing GITHUB_TOKEN if set', () => {
    process.env.GITHUB_TOKEN = 'existing-token';
    expect(() => ensureGitHubToken()).not.toThrow();
    expect(process.env.GITHUB_TOKEN).toBe('existing-token');
  });

  it('falls back to gh CLI token when env is missing', () => {
    delete process.env.GITHUB_TOKEN;
    (execSync as unknown as vi.Mock).mockReturnValue('cli-token\n');
    ensureGitHubToken();
    expect(process.env.GITHUB_TOKEN).toBe('cli-token');
  });

  it('exits process when no token available', () => {
    delete process.env.GITHUB_TOKEN;
    (execSync as unknown as vi.Mock).mockImplementation(() => {
      throw new Error('gh not available');
    });
    const spyExit = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called');
    });
    expect(() => ensureGitHubToken()).toThrow('process.exit called');
    spyExit.mockRestore();
  });
});
