import { ExecutionContext } from '@nestjs/common';

export class ContextHelper {
  static getAuthToken(context: ExecutionContext): string | undefined {
    const request = ContextHelper.getRequest<any>(context);
    const authHeader = request.headers.authorization;
    return authHeader;
  }

  static getCurrentUser<User extends object>(
    context: ExecutionContext,
  ): User | undefined {
    try {
      const request = ContextHelper.getRequest<any>(context);
      return request.user;
    } catch (error) {
      return undefined;
    }
  }

  static getRequest<T extends object>(context: ExecutionContext): T {
    let request: any;
    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest<T>();
    } else if (context.getType() === 'rpc') {
      request = context.switchToRpc().getData<T>();
    }
    return request;
  }
}
