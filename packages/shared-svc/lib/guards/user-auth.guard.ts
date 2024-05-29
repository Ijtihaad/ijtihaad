import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRpcService } from 'lib/interfaces/auth.interface';
import { lastValueFrom } from 'rxjs';
import { RpcClient } from '../core/rpc-client';
import { ContextHelper } from '../helpers/context.helper';

@Injectable()
export class UserAuthGuard implements CanActivate {
  private readonly logger = new Logger(UserAuthGuard.name);
  private authRpc: AuthRpcService;
  constructor(private rpcClient: RpcClient) {
    this.authRpc = this.rpcClient.createRpcClient('auth');
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
      this.authRpc('verifyAccessToken', { accessToken: token }),
    );

    if (!user) {
      throw new UnauthorizedException('Access Token Invalid or Expired!');
    }

    request.user = user;
    return true;
  }
}
