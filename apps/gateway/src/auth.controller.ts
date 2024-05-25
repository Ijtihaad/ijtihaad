import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes
} from '@nestjs/common';
import { LocalLogin, LocalRegister, localLoginSchema, localRegisterSchema } from '@repo/common';
import { AuthRpcService, RpcClient, ValidationPipe } from '@repo/shared-svc';

@Controller('auth')
export class AuthController {
  private authRpc: AuthRpcService;
  constructor(private rpcClient: RpcClient) {
    this.authRpc = this.rpcClient.createRpcClient('auth')
  }

  @Post('local/register')
  @UsePipes(ValidationPipe(localRegisterSchema))
  async localRegister(@Body() data: LocalRegister) {
    return this.authRpc("localRegister", data);
  }

  @Post('local/login')
  @UsePipes(ValidationPipe(localLoginSchema))
  async localLogin(@Body() data: LocalLogin) {
    return this.authRpc('localLogin', data);
  }

  @Get('google/url')
  async googleUrl() {
    return this.authRpc('googleUrl', {});
  }

  @Post('google/login')
  async googleLogin(@Body() data: { code: string }) {
    return (this.authRpc('googleLogin', data));
  }

  @Post('token/refresh')
  async refreshAccessToken(@Body() data: { refreshToken: string }) {
    return this.authRpc('refreshAccessToken', data)
  }
}
