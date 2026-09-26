# Security Policy

## Reporting a Vulnerability
If you discover a security vulnerability in this project, please report it responsibly.

- Email: security@nativelyai.com
- Do not open public issues for security concerns.

## Supported Versions
We support the latest `main` branch. Older branches may not receive security updates.

## Best Practices
- Keep dependencies updated (`npm audit` and `pip-audit`).
- Use environment variables for secrets (see `.env.example`).
- Never commit credentials or tokens.
- Run `npm run lint` and `npm test` before pushing changes.

## Disclosure
We will acknowledge valid reports and provide updates until the issue is resolved.
