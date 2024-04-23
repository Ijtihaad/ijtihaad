import { getRequestFromContext } from '@apps/server/global';
import { CanActivate, ExecutionContext } from '@nestjs/common';

export function PermissionGuard(status: any[]) {
  return class PermissionClass implements CanActivate {
    canActivate(context: ExecutionContext) {
      const { user, query, params } =
        getRequestFromContext<any>(context);
      return status.includes(user.blocked);
    }
  };
}
