import {
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ContextHelper } from '../helpers/context.helper';

export class ServiceAuthGuard implements CanActivate {
  private readonly logger = new Logger(ServiceAuthGuard.name);

  async canActivate(context: ExecutionContext) {
    this.logger.log(this.canActivate.name);
    const authHeader = ContextHelper.getAuthToken(context);
    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Unauthorized Access');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SERVICE_SECRETE_KEY!);
    } catch (error) {
      throw new UnauthorizedException('Service Token Invalid or Expired!');
    }

    return true;
  }
}
