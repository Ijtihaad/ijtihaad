import { ExecutionContext } from '@nestjs/common';
import { getRequestFromContext } from './getRequestFromContext';

export function getCurrentUserFromContext<User extends object>(
  context: ExecutionContext,
): User | undefined {
  try {
    const request = getRequestFromContext<any>(context);
    return request.user;
  } catch (error) {
    return undefined;
  }
}
