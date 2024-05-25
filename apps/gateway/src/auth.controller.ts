import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  Patch,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RpcHandler, UserRpcService } from '@repo/shared-svc';

@Controller('auth')
export class AuthController implements OnModuleInit, OnModuleDestroy {
  private authRpc: UserRpcService;
  constructor(@Inject('MICRO_SERVICE') private client: ClientProxy) {
    this.authRpc = RpcHandler.createRpcClient('auth', this.client);
  }

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @Get()
  findMany() {
    return this.authRpc('findMany', {
      data: {},
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authRpc('findOne', {
      data: { id },
    });
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() data: any) {
    return this.authRpc('updateUser', {
      data: { ...data, id },
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.authRpc('delete', {
      data: { id },
    });
  }
}
