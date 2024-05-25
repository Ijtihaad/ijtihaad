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

@Controller('users')
export class UsersController implements OnModuleInit, OnModuleDestroy {
  private usersRpc: UserRpcService;
  constructor(@Inject('MICRO_SERVICE') private client: ClientProxy) {
    this.usersRpc = RpcHandler.createRpcClient('users', this.client);
  }

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @Get()
  findMany() {
    return this.usersRpc('findMany', {
      data: {},
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersRpc('findOne', {
      data: { id },
    });
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() data: any) {
    return this.usersRpc('updateUser', {
      data: { ...data, id },
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersRpc('delete', {
      data: { id },
    });
  }
}
