import type { NextRequest } from 'next/server';

import { authMiddleware } from '@/middleware/auth';

export function composedMiddleware(req: NextRequest) {
  const authResult = authMiddleware(req);

  if (authResult) return authResult;

  return null;
}
