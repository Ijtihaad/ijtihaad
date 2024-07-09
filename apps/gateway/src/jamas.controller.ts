import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Jama, User } from '@repo/common';
import {
  CurrentUser,
  JamaRpcService,
  RpcClient,
} from '@repo/shared-svc';
import { UserAuthGuard } from './guards/user-auth.guard';

@Controller('jamas')
export class JamasController {
  private jamasRpc: JamaRpcService;
  constructor(private rpcClient: RpcClient) {
    this.jamasRpc = this.rpcClient.createRpcClient('jamas');
  }

  @Get()
  findMany() {
    return this.jamasRpc('findMany', {});
  }

  @Get('me')
  @UseGuards(UserAuthGuard)
  findMe(@CurrentUser() user: User) {
    const jamaId = ""
    return this.jamasRpc('findOne', { _id: jamaId });
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.jamasRpc('findOne', { _id });
  }

  @Patch(':_id')
  updateJama(@Param('_id') _id: string, @Body() data: any) {
    return this.jamasRpc('updateJama', { ...data, _id });
  }

  @Delete(':_id')
  delete(@Param('_id') _id: string) {
    return this.jamasRpc('delete', { _id });
  }
}
