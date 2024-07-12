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
import { UserAuthGuard } from '../guards/user-auth.guard';

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
    return this.usersRpc('findOne', { _id: user._id });
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.usersRpc('findOne', { _id });
  }

  @Patch(':_id')
  updateUser(@Param('_id') _id: string, @Body() data: any) {
    return this.usersRpc('updateUser', { ...data, _id });
  }

  @Delete(':_id')
  delete(@Param('_id') _id: string) {
    return this.usersRpc('delete', { _id });
  }
}
