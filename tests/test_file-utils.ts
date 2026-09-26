import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { findMarkdownFiles, mergeFrontmatterProperties } from '../src/ai-tools/lib/file-utils';

describe('file-utils', () => {
  const tmpDir = path.join(__dirname, 'tmp');
  const mdFile = path.join(tmpDir, 'test.md');

  beforeAll(() => {
    fs.mkdirSync(tmpDir, { recursive: true });
    fs.writeFileSync(mdFile, `---
title: 'Old Title'
intro: 'Old intro'
---
Content here
`);
  });

  afterAll(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('finds markdown files under rootDir', () => {
    const files = findMarkdownFiles(tmpDir, tmpDir);
    expect(files).toContain(mdFile);
  });

  it('merges frontmatter properties safely', () => {
    const updated = mergeFrontmatterProperties(mdFile, `title: New Title\nintro: New intro`);
    expect(updated).toContain("title: 'New Title'");
    expect(updated).toContain("intro: 'New intro'");
  });

  it('filters out unsafe keys', () => {
    const updated = mergeFrontmatterProperties(mdFile, `__proto__: hacked`);
    expect(updated).not.toContain('__proto__');
  });
});
