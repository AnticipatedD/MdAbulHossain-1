import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import { getAvailableEditorTypes, getRefinementDescriptions, enrichIndexContext, callEditor } from '../src/ai-tools/lib/prompt-util';

vi.mock('fs');

describe('prompt-util', () => {
  it('returns editor types from markdown files', () => {
    (fs.readdirSync as unknown as vi.Mock).mockReturnValue(['alpha.md', 'beta.md', 'ignore.txt']);
    const types = getAvailableEditorTypes('/fake');
    expect(types).toEqual(['alpha', 'beta']);
  });

  it('returns refinement descriptions', () => {
    expect(getRefinementDescriptions(['a', 'b'])).toBe('a, b');
  });

  it('enriches index context with product and child titles', () => {
    const content = '---\nchildren:\n- child1\n---\n';
    const filePath = path.join('content', 'github-models', 'index.md');
    const enriched = enrichIndexContext(filePath, content);
    expect(enriched).toContain('Product: Github Models');
  });

  it('throws when prompt file missing in callEditor', async () => {
    (fs.existsSync as unknown as vi.Mock).mockReturnValue(false);
    await expect(callEditor('missing', 'input', '/fake', true)).rejects.toThrow(/Prompt file not found/);
  });
});
