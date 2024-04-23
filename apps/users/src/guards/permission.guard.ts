import { getRequestFromContext } from '@apps/server/global';
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export function RoleGuard(roles: any[]) {
  return class RoleGuardClass implements CanActivate {
    canActivate(context: ExecutionContext) {
      const { user, query, params } = getRequestFromContext<any>(context);
      if (user.blocked) {
        throw new UnauthorizedException('User Blocked By Admin');
      }

      return roles.includes(user.role);
    }
  };
}
