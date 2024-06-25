import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@repo/common';
import {
  CurrentUser,
  RpcClient,
  UserRpcService,
} from '@repo/shared-svc';
import { UserAuthGuard } from './guards/user-auth.guard';

@Controller('users')
export class UsersController {
  private usersRpc: UserRpcService;
  constructor(private rpcClient: RpcClient) {
    this.usersRpc = this.rpcClient.createRpcClient('users');
  }

  @Get()
  findMany() {
    return this.usersRpc('findMany', {});
  }

  @Get('me')
  @UseGuards(UserAuthGuard)
  findMe(@CurrentUser() user: User) {
    return this.usersRpc('findOne', { id: user.id });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersRpc('findOne', { id });
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() data: any) {
    return this.usersRpc('updateUser', { ...data, id });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersRpc('delete', { id });
  }
}
