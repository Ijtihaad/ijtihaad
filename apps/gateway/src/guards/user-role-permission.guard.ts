import {
  CanActivate,
  ExecutionContext,
  Logger
} from '@nestjs/common';
import { AccessTokenPayload, UserRolePermission } from '@repo/common';
import { ContextHelper } from '@repo/shared-svc';

export function UserRolePermissionGuard(permissions: UserRolePermission[]) {
  return class Guard implements CanActivate {
    readonly logger = new Logger(UserRolePermissionGuard.name);

    async canActivate(context: ExecutionContext) {
      this.logger.log(this.canActivate.name);

      const request = ContextHelper.getCurrentUser<{
        user: AccessTokenPayload;
      }>(context);

      //  if(check if user not have role access permission){
      //   throw new ForbiddenException('Forbidden Access');
      //   }

      return true;
    }
  };
}
