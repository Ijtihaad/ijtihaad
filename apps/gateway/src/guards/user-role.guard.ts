import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { AccessTokenPayload, UserRole } from '@repo/common';
import { ContextHelper } from '@repo/shared-svc';

export function UserRoleGuard(roles: UserRole[]) {
  return class Guard implements CanActivate {
    readonly logger = new Logger(UserRoleGuard.name);

    async canActivate(context: ExecutionContext) {
      this.logger.log(this.canActivate.name);

      const request = ContextHelper.getCurrentUser<{
        user: AccessTokenPayload;
      }>(context);

      if (request?.user.role && !roles.includes(request?.user.role)) {
        throw new ForbiddenException('Forbidden Access');
      }

      return true;
    }
  };
}
