import { AuthenticatedRequest } from '@common';
import { getRequestFromContext } from '@server/global/helpers/getRequestFromContext';
import { CanActivate, ExecutionContext } from '@nestjs/common';

export function PermissionGuard(status: any[]) {
  return class PermissionClass implements CanActivate {
    canActivate(context: ExecutionContext) {
      const { user, query, params } =
        getRequestFromContext<AuthenticatedRequest>(context);
      return status.includes(user.blocked);
    }
  };
}
