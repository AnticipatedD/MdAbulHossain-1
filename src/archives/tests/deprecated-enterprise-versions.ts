import { describe, it, expect } from 'vitest';
import { deprecatedEnterpriseVersions } from '../deprecated-enterprise-versions';
import { Request, Response } from 'express';

describe('deprecatedEnterpriseVersions middleware', () => {
  it('redirects when a redirect target exists', () => {
    const req = { path: '/old-path' } as Request;
    const res = {
      redirect: (code: number, target: string) => {
        expect(code).toBe(301);
        expect(target).toBeDefined();
      },
      status: () => ({ send: () => {} })
    } as unknown as Response;

    deprecatedEnterpriseVersions(req, res, () => {});
  });

  it('returns 410 when no redirect target exists', () => {
    const req = { path: '/unknown' } as Request;
    let statusCode: number | null = null;
    const res = {
      redirect: () => {},
      status: (code: number) => {
        statusCode = code;
        return { send: (msg: string) => expect(msg).toContain('deprecated') };
      }
    } as unknown as Response;

    deprecatedEnterpriseVersions(req, res, () => {});
    expect(statusCode).toBe(410);
  });
});
