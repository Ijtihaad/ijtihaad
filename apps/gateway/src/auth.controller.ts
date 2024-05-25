import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Post,
  UsePipes
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LocalLogin, LocalRegister, localLoginSchema, localRegisterSchema } from '@repo/common';
import { AuthRpcService, RpcHandler, ServiceRequest, ValidationPipe } from '@repo/shared-svc';

@Controller('auth')
export class AuthController implements OnModuleInit, OnModuleDestroy {
  private authRpc: AuthRpcService;
  constructor(@Inject('MICRO_SERVICE') private client: ClientProxy) {
    this.authRpc = RpcHandler.createRpcClient('auth', this.client);
  }

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @Post('local/register')
  @UsePipes(ValidationPipe(localRegisterSchema))
  async localRegister(@Body() data: LocalRegister) {
    return this.authRpc("localRegister", { data });
  }

  @Post('local/login')
  @UsePipes(ValidationPipe(localLoginSchema))
  async localLogin(@Body() data: LocalLogin) {
    return this.authRpc('localLogin', { data });
  }

  @Get('google/url')
  async googleUrl() {
    return this.authRpc('googleUrl', {});
  }

  @Post('google/login')
  async googleLogin(@Body() { data }: ServiceRequest<{ code: string }>) {
    return (this.authRpc('googleLogin', { data }));
  }

  @Post('token/refresh')
  async refreshAccessToken(@Body() data: { refreshToken: string }) {
    return this.authRpc('refreshAccessToken', { data })
  }
}
