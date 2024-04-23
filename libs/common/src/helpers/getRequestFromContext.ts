import { ExecutionContext } from '@nestjs/common';

export function getRequestFromContext<T extends object>(
  context: ExecutionContext,
): T {
  let request: any;
  if (context.getType() === 'http') {
    request = context.switchToHttp().getRequest<T>();
  } else if (context.getType() === 'rpc') {
    request = context.switchToRpc().getData<T>();
  }
  return request;
}
