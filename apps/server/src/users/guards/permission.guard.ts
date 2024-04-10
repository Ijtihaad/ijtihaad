import { AuthenticatedRequest, Role } from '@common';
import { getRequestFromContext } from '@server/global/helpers/getRequestFromContext';
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export function RoleGuard(roles: Role[]) {
  return class RoleGuardClass implements CanActivate {
    canActivate(context: ExecutionContext) {
      const { user, query, params } =
        getRequestFromContext<AuthenticatedRequest>(context);
      if (user.blocked) {
        throw new UnauthorizedException('User Blocked By Admin');
      }

      return roles.includes(user.role);
    }
  };
}
