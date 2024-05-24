import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ContextHelper } from '../helpers/context.helper';
import { RpcHandler } from '../core/rpc-handler';
import { AuthRpcService } from 'lib/interfaces/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  private authRpc: AuthRpcService;
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {
    this.authRpc = RpcHandler.createRpcClient('auth', this.authClient);
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
