import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import {
  Login,
  Register,
  loginSchema,
  registerSchema,
} from '@repo/common';
import { AuthRpcService, RpcClient, ValidationPipe } from '@repo/shared-svc';

@Controller('auth')
export class AuthController {
  private authRpc: AuthRpcService;
  constructor(private rpcClient: RpcClient) {
    this.authRpc = this.rpcClient.createRpcClient('auth');
  }

  @Post('register')
  @UsePipes(ValidationPipe(registerSchema))
  async register(@Body() data: Register) {
    return this.authRpc('register', data);
  }

  @Post('login')
  @UsePipes(ValidationPipe(loginSchema))
  async login(@Body() data: Login) {
    return this.authRpc('login', data);
  }

  @Post('token/refresh')
  async refreshAccessToken(@Body() data: { refreshToken: string }) {
    return this.authRpc('refreshAccessToken', data);
  }
}
