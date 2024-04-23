import { getCurrentUserFromContext } from '@apps/server/auth/helpers/getCurrentUserFromContext';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getCurrentUserFromContext(context);
  }
);
