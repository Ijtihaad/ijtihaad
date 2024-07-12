import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AccountType, CreateThoughtAPI, CreateThoughtSVC, UpdateThoughtAPI, User } from '@repo/common';
import {
  CurrentUser,
  RpcClient,
  ThoughtRpcService
} from '@repo/shared-svc';
import { UserAuthGuard } from '../guards/user-auth.guard';

@Controller('thought')
export class ThoughtController {
  private thoughtRpc: ThoughtRpcService;
  constructor(private rpcClient: RpcClient) {
    this.thoughtRpc = this.rpcClient.createRpcClient('thought');
  }

  @Get()
  findMany(
    @CurrentUser() user: User,
    @Body() data: CreateThoughtAPI
  ) {
    const thought: CreateThoughtSVC = {
      ...data,
      userId: user._id
    }
    return this.thoughtRpc('create', thought);
  }

  @Get('my')
  @UseGuards(UserAuthGuard)
  findMy(@CurrentUser() user: User) {
    return this.thoughtRpc('findMany', {
      account: {
        accountType: AccountType.user,
        accountId: user._id,
      }
    });
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.thoughtRpc('findOne', { _id });
  }

  @Patch(':_id')
  updateThought(@Param('_id') _id: string, @Body() data: UpdateThoughtAPI) {
    return this.thoughtRpc('updateThought', { ...data, _id });
  }

  @Delete(':_id')
  delete(@Param('_id') _id: string) {
    return this.thoughtRpc('delete', { _id });
  }
}
