import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ContextHelper } from '@repo/shared-svc';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return ContextHelper.getCurrentUser(context);
  },
);
