import { execSync } from 'child_process';

/**
 * Ensures that a GitHub token is available in process.env.GITHUB_TOKEN.
 * Falls back to the GitHub CLI (`gh auth token`) if not set.
 * Exits the process with a clear message if neither is available.
 */
export function ensureGitHubToken(): void {
  if (!process.env.GITHUB_TOKEN) {
    try {
      const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
      if (token) {
        process.env.GITHUB_TOKEN = token;
        return;
      }
    } catch {
      // gh CLI not available or not authenticated
    }

    console.warn(
      `🔑 A GitHub token is required to run this script. Please do one of the following:

1. Add a GITHUB_TOKEN to a local .env file.
2. Install https://cli.github.com and authenticate via 'gh auth login'.
`
    );
    process.exit(1);
  }
}
