import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export function getRequestFromContext<T extends Request>(
  context: ExecutionContext
): T {
  let request: T;
  if (context.getType() === 'http') {
    request = context.switchToHttp().getRequest<T>();
  } else if (context.getType() === 'rpc') {
    request = context.switchToRpc().getData<T>();
  }
  return request;
}
