import {
  CreateAddress,
  CreateUser,
  Role,
  UpdateAddress,
  UpdateUser,
  User,
  UserWhereInput,
  UserWhereUniqueInput,
} from '@common';
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QueryPipe } from '../global/pipes/query.pipe';
import { AddressService } from './address.service';
import { CurrentUser } from './decorators/current-user-decorator';
import { RoleGuard } from './guards/permission.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly addressService: AddressService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard([Role.ADMIN]))
  async create(@Body() data: CreateUser) {
    this.logger.log(this.create.name);
    let { address, ...userData } = data;
    const user = await this.usersService.create(userData);
    if (address) {
      const addr = await this.addressService.create(address);
      user['address'] = addr;
    }
    return user;
  }

  @Get()
  @UseGuards(
    JwtAuthGuard,
    RoleGuard([Role.ADMIN]),
  )
  @UsePipes(QueryPipe)
  async findMany(
    @Query('filters') filters: Record<string, any>,
    @Query('search') search: string,
    @CurrentUser() user: User,
  ) {
    this.logger.log(this.findMany.name);

    if (search?.length || (filters && Object.keys(filters).length)) {
    }

    const where: UserWhereInput = filters ?? {};
    if (search?.length) {
      where.OR = where.OR?.length ? where.OR : [];
      where.OR.push({ firstName: { contains: search, mode: 'insensitive' } });
      where.OR.push({ lastName: { contains: search, mode: 'insensitive' } });
      where.OR.push({ phone: { contains: search, mode: 'insensitive' } });
      where.OR.push({ email: { contains: search, mode: 'insensitive' } });
    }

    return this.usersService.findMany(where);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User) {
    this.logger.log(this.getMe.name);

    return this.usersService.findOne({
      id: user.id,
    });
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(@CurrentUser() user: User, @Body() data: UpdateUser) {
    this.logger.log(this.updateMe.name);
    if (data.role) delete data.role;
    if (data.blocked) delete data.blocked;

    const updatedUser = await this.usersService.update({ id: user.id }, data);
    return updatedUser;
  }

  @Post('me/address')
  @UseGuards(JwtAuthGuard)
  async createAddress(@Body() data: CreateAddress, @CurrentUser() user: User) {
    this.logger.log(this.createAddress.name);
    const addressExist = await this.addressService.findOne({
      userId: user.id,
    });
    if (addressExist) {
      throw new ConflictException('Address exist');
    }
    const address = await this.addressService.create({
      user: {
        connect: {
          id: user.id,
        },
      },
      ...data,
    });

    return address;
  }

  @Patch('me/address')
  @UseGuards(JwtAuthGuard)
  async updateMyAddress(
    @Body() data: UpdateAddress,
    @CurrentUser() user: User,
  ) {
    this.logger.log(this.updateMyAddress.name);
    const address = await this.addressService.update({ userId: user.id }, data);

    return address;
  }

  @Get(':id')
  @UseGuards(
    JwtAuthGuard,
    RoleGuard([Role.ADMIN]),
  )
  async findOne(@Param('id') id: string, @CurrentUser() user: User) {
    this.logger.log(this.findOne.name);

    const where: UserWhereUniqueInput = { id };

    return this.usersService.findOne(where);
  }

  @Patch(':id')
  @UseGuards(
    JwtAuthGuard,
    RoleGuard([Role.ADMIN]),
  )
  async update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() data: UpdateUser,
  ) {
    this.logger.log(this.update.name);
    if (user.role !== Role.ADMIN) {
      if (data.role) delete data.role;
      if (data.blocked) delete data.blocked;
    }
    if (user.role === Role.ADMIN || user.id === id) {
      if (data.role) data.role = Role.ADMIN;
      if (data.blocked) data.blocked = false;
    }

    const beforeUpdatedUser = await this.usersService.findOne({ id });
    const updatedUser = await this.usersService.update({ id }, data);
    return updatedUser;
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  async deleteMe(@CurrentUser() user: User) {
    this.logger.log(this.deleteMe.name);

    const deletedUser = await this.usersService.delete({
      id: user.id,
    });

    return deletedUser;
  }

  @Delete(':id')
  @UseGuards(
    JwtAuthGuard,
    RoleGuard([Role.ADMIN]),
  )
  async delete(@Param('id') id: string, @CurrentUser() user: User) {
    this.logger.log(this.delete.name);

    const deletedUser = await this.usersService.delete({ id });
    return deletedUser;
  }
}
