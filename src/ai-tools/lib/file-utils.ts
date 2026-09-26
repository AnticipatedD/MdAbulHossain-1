import fs from 'fs';
import path from 'path';
import { load } from 'js-yaml';
import readFrontmatter from '@/frame/lib/read-frontmatter';
import { schema } from '@/frame/lib/frontmatter';

const MAX_DIRECTORY_DEPTH = 20;

export function findMarkdownFiles(
  dir: string,
  rootDir: string,
  depth = 0,
  maxDepth = MAX_DIRECTORY_DEPTH,
  visited: Set<string> = new Set()
): string[] {
  const markdownFiles: string[] = [];

  let realDir: string;
  try {
    realDir = fs.realpathSync(dir);
  } catch {
    return [];
  }

  // Prevent escaping root directory
  if (!realDir.startsWith(rootDir)) return [];

  // Prevent symlink loops
  if (visited.has(realDir)) return [];
  visited.add(realDir);

  if (depth > maxDepth) return [];

  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(realDir, { withFileTypes: true });
  } catch {
    return [];
  }

  for (const entry of entries) {
    const fullPath = path.join(realDir, entry.name);

    let realFullPath: string;
    try {
      realFullPath = fs.realpathSync(fullPath);
    } catch {
      continue;
    }

    if (!realFullPath.startsWith(rootDir)) continue;

    if (entry.isDirectory()) {
      markdownFiles.push(
        ...findMarkdownFiles(realFullPath, rootDir, depth + 1, maxDepth, visited)
      );
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      markdownFiles.push(realFullPath);
    }
  }

  return markdownFiles;
}

interface FrontmatterProperties {
  intro?: string;
  [key: string]: unknown;
}

/**
 * Merge new frontmatter properties into an existing markdown file.
 * Only updates allowed keys defined in schema, preventing unsafe injection.
 */
export function mergeFrontmatterProperties(
  filePath: string,
  newPropertiesYaml: string
): string {
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = readFrontmatter(content);

  if (parsed.errors?.length) {
    throw new Error(
      `Failed to parse frontmatter: ${parsed.errors.map((e) => e.message).join(', ')}`
    );
  }

  if (!parsed.content) {
    throw new Error('Failed to parse content from file');
  }

  try {
    let cleanedYaml = newPropertiesYaml.trim()
      .replace(/^```ya?ml\s*\n/i, '')
      .replace(/\n```\s*$/i, '')
      .trim();

    const newProperties = load(cleanedYaml) as FrontmatterProperties;

    const allowedKeys = Object.keys(schema.properties);
    const sanitizedProperties = Object.fromEntries(
      Object.entries(newProperties).filter(([key]) => {
        if (allowedKeys.includes(key)) return true;
        console.warn(`Filtered out unsafe frontmatter key: ${key}`);
        return false;
      })
    );

    const lines = content.split('\n');
    let inFrontmatter = false;
    let frontmatterEndIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        if (!inFrontmatter) {
          inFrontmatter = true;
        } else {
          frontmatterEndIndex = i;
          break;
        }
      }
    }

    for (const [key, value] of Object.entries(sanitizedProperties)) {
      const formattedValue =
        typeof value === 'string' ? `'${value.replace(/'/g, "''")}'` : value;

      let foundField = false;
      for (let i = 1; i < frontmatterEndIndex; i++) {
        const line = lines[i];
        if (line.startsWith(`${key}:`)) {
          foundField = true;
          const colonIndex = line.indexOf(':');
          const leadingSpace = line.substring(colonIndex + 1, colonIndex + 2);
          lines[i] = `${key}:${leadingSpace}${formattedValue}`;

          // Remove continuation lines
          let j = i + 1;
          while (j < frontmatterEndIndex && lines[j].startsWith('  ')) {
            lines.splice(j, 1);
            frontmatterEndIndex--;
          }
          break;
        }
      }

      if (!foundField && frontmatterEndIndex > 0) {
        lines.splice(frontmatterEndIndex, 0, `${key}: ${formattedValue}`);
        frontmatterEndIndex++;
      }
    }

    return lines.join('\n');
  } catch (error) {
    console.error('Failed to parse new frontmatter properties:', error);
    throw new Error(`Failed to parse new frontmatter properties: ${error}`);
  }
}
