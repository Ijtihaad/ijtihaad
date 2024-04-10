import { getCurrentUserFromContext } from '@server/global/helpers/getCurrentUserFromContext';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getCurrentUserFromContext(context);
  }
);
