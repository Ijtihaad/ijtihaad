import {
  SelectUser,
  UpdateUser,
  UserRole,
  UserWhereInput,
  UserWhereUniqueInput,
} from '@lib/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CurrentUser } from './decorators/current-user-decorator';
import { UpdateUserPipe } from './pipes/update-user.pipe';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UsePipes(QueryPipe)
  async findMany(
    @Query('filters') filters: UserWhereInput,
    @Query('search') search: string,
    @CurrentUser() user: SelectUser,
  ) {
    return this.usersService.findMany(filters);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@CurrentUser() user: SelectUser) {
    this.logger.log(this.getMe.name);

    return this.usersService.findOne({
      id: user.id,
    });
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  async updateMe(@CurrentUser() user: SelectUser, @Body() data: UpdateUser) {
    this.logger.log(this.updateMe.name);
    if (data.role) delete data.role;
    if (data.blocked) delete data.blocked;

    const updatedUser = await this.usersService.update({ id: user.id }, data);
    return updatedUser;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string, @CurrentUser() user: SelectUser) {
    this.logger.log(this.findOne.name);

    const where: UserWhereUniqueInput = { id };

    return this.usersService.findOne(where);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(UpdateUserPipe)
  async update(
    @Param('id') id: string,
    @CurrentUser() user: SelectUser,
    @Body() data: UpdateUser,
  ) {
    this.logger.log(this.update.name);

    if (user.role !== UserRole.ADMIN) {
      if (data.role) delete data.role;
      if (data.blocked) delete data.blocked;
    }
    if (user.role === UserRole.ADMIN || user.id === id) {
      if (data.role) data.role = UserRole.ADMIN;
      if (data.blocked) data.blocked = false;
    }
    const updatedUser = await this.usersService.update({ id }, data);
    return updatedUser;
  }

  @Delete('me')
  @UseGuards(AuthGuard)
  async deleteMe(@CurrentUser() user: SelectUser) {
    this.logger.log(this.deleteMe.name);

    const deletedUser = await this.usersService.delete({
      id: user.id,
    });

    return deletedUser;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string, @CurrentUser() user: SelectUser) {
    this.logger.log(this.delete.name);

    const deletedUser = await this.usersService.delete({ id });
    return deletedUser;
  }
}
