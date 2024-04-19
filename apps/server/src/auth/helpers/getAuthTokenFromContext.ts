import { getRequestFromContext } from '@apps/server/global';
import { ExecutionContext } from '@nestjs/common';

export function getAuthTokenFromContext(
  context: ExecutionContext,
): string | undefined {
  const request = getRequestFromContext<any>(context)
  const authHeader = request.headers['authorization'];
  return authHeader;
}
