import { ExecutionContext } from '@nestjs/common';
import { getRequestFromContext } from './getRequestFromContext';
import { Request } from 'express';

export function getQueryFromContext(
  context: ExecutionContext
): Record<string, any> | undefined {
  const request = getRequestFromContext<Request>(context);
  return request.query ?? {};
}
