import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ContextHelper } from '@repo/shared-svc';

export const AuthToken = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return ContextHelper.getAuthToken(context);
  },
);
