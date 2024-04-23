import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { getAuthTokenFromContext } from '../../../../libs/common/src/helpers/getAuthTokenFromContext';

export const AuthToken = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getAuthTokenFromContext(context);
  },
);
