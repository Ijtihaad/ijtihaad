import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthRpcService } from 'lib/interfaces/auth.interface';
import { lastValueFrom } from 'rxjs';
import { RpcHandler } from '../core/rpc-handler';
import { ContextHelper } from '../helpers/context.helper';

@Injectable()
export class ServiceGuard implements CanActivate {
  private readonly logger = new Logger(ServiceGuard.name);
  private authRpc: AuthRpcService;
  constructor(@Inject('MICRO_SERVICE') private client: ClientProxy) {
    this.authRpc = RpcHandler.createRpcClient('auth', this.client);
  }

  async canActivate(context: ExecutionContext) {
    this.logger.log(this.canActivate.name);

    const authHeader = ContextHelper.getAuthToken(context);
    const request = ContextHelper.getRequest<{ user: any }>(context);
    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await lastValueFrom(
      this.authRpc('verifyAccessToken', {
        data: { accessToken: token },
      }),
    );

    if (!user) {
      throw new UnauthorizedException('Access Token Invalid or Expired!');
    }

    request.user = user;
    return true;
  }
}
