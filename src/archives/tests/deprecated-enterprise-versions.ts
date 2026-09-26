import { Request, Response, NextFunction } from 'express';
import { createLogger } from '../../ai-tools/lib/logger';
import { resolveArchivedRedirect } from '../lib/resolve-archived-redirect';

const logger = createLogger('deprecated-enterprise-versions');

/**
 * Middleware to handle deprecated enterprise version requests.
 * Redirects to the correct supported version or returns 410 Gone if no redirect is available.
 */
export function deprecatedEnterpriseVersions(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const { path } = req;

    const redirectTarget = resolveArchivedRedirect(path);

    if (redirectTarget) {
      logger.info(`Redirecting deprecated path ${path} -> ${redirectTarget}`);
      res.redirect(301, redirectTarget);
      return;
    }

    logger.warn(`No redirect found for deprecated path: ${path}`);
    res.status(410).send('This enterprise version is deprecated and no longer available.');
  } catch (err) {
    logger.error('Error handling deprecated enterprise version', { error: err });
    next(err);
  }
}
