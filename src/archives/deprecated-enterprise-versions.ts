import { Request, Response, NextFunction } from 'express';
import { createLogger } from '../../ai-tools/lib/logger';
import { resolveArchivedRedirect } from './lib/resolve-archived-redirect';

const logger = createLogger('deprecated-enterprise-versions');

/**
 * Middleware to handle deprecated enterprise version requests.
 */
export function deprecatedEnterpriseVersions(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const redirectTarget = resolveArchivedRedirect(req.path);

    if (redirectTarget) {
      logger.info(`Redirecting ${req.path} -> ${redirectTarget}`);
      res.redirect(301, redirectTarget);
      return;
    }

    logger.warn(`No redirect found for ${req.path}`);
    res.status(410).send('This enterprise version is deprecated.');
  } catch (err) {
    logger.error('Error handling deprecated enterprise version', { error: err });
    next(err);
  }
}
