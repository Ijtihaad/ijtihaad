import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ContextHelper } from '../helpers/context.helper';

export const AuthToken = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return ContextHelper.getAuthToken(context);
  },
);
