import { ExecutionContext } from '@nestjs/common';
import { getRequestFromContext } from './getRequestFromContext';
import { User } from '@common';

export function getCurrentUserFromContext(
  context: ExecutionContext
): User | undefined {
  try {
    const request = getRequestFromContext<any>(context);

    return request.user;
  } catch (error) {}
}
