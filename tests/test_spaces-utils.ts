import { describe, it, expect } from 'vitest';
import { parseSpaceUrl, convertSpaceToPrompt } from '../src/ai-tools/lib/spaces-utils';

describe('spaces-utils', () => {
  it('parses valid Copilot Space URL', () => {
    const url = 'https://api.github.com/orgs/testorg/copilot-spaces/123';
    const result = parseSpaceUrl(url);
    expect(result.org).toBe('testorg');
    expect(result.id).toBe('123');
  });

  it('throws on invalid Copilot Space URL', () => {
    expect(() => parseSpaceUrl('https://example.com')).toThrow(/Invalid Copilot Space URL/);
  });

  it('converts space data to prompt', () => {
    const space = {
      id: 1,
      number: 42,
      name: 'Test Space',
      description: 'desc',
      general_instructions: 'Follow these steps carefully.',
      resources_attributes: [
        {
          id: 1,
          resource_type: 'free_text',
          copilot_chat_attachment_id: null,
          metadata: { name: 'Context A', text: 'Some context text' }
        }
      ],
      html_url: 'https://github.com/orgs/testorg/copilot-spaces/42',
      created_at: '',
      updated_at: ''
    };
    const prompt = convertSpaceToPrompt(space);
    expect(prompt).toContain('Test Space');
    expect(prompt).toContain('Context A');
    expect(prompt).toContain('Some context text');
  });
});
