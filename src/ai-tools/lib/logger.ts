/* eslint-disable no-console */

/**
 * Create a namespaced logger with info, warn, and error methods.
 * Each log entry is prefixed with timestamp and namespace.
 */
export function createLogger(namespace: string) {
  const format = (level: string, message: string, meta?: Record<string, unknown>) => {
    const timestamp = new Date().toISOString();
    const base = `[${timestamp}] [${namespace}] [${level}] ${message}`;
    if (meta) {
      return `${base} ${JSON.stringify(meta)}`;
    }
    return base;
  };

  return {
    info: (message: string, meta?: Record<string, unknown>) =>
      console.log(format('INFO', message, meta)),
    warn: (message: string, meta?: Record<string, unknown>) =>
      console.warn(format('WARN', message, meta)),
    error: (message: string, meta?: Record<string, unknown>) =>
      console.error(format('ERROR', message, meta))
  };
}
