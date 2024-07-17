import {
  CanActivate,
  ExecutionContext,
  Logger
} from '@nestjs/common';
import { AccessTokenPayload, UserEligibilityPermission } from '@repo/common';
import { ContextHelper } from '@repo/shared-svc';

export function UserEligibilityPermissionGuard(permissions: UserEligibilityPermission[]) {
  return class Guard implements CanActivate {
    readonly logger = new Logger(UserEligibilityPermissionGuard.name);

    async canActivate(context: ExecutionContext) {
      this.logger.log(this.canActivate.name);

      const request = ContextHelper.getCurrentUser<{
        user: AccessTokenPayload;
      }>(context);

      //  if(check if user not have eligibility access permission){
      //   throw new ForbiddenException('Forbidden Access');
      //   }

      return true;
    }
  };
}
