import { RpcHandler, UserRpcService } from '@repo/shared-svc';
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
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UsersController implements OnModuleInit, OnModuleDestroy {
  private usersRpc: UserRpcService;
  constructor(@Inject('USERS_SERVICE') private usersClient: ClientProxy) {
    this.usersRpc = RpcHandler.createRpcClient('users', this.usersClient);
  }

  async onModuleInit() {
    await this.usersClient.connect();
  }

  async onModuleDestroy() {
    await this.usersClient.close();
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
