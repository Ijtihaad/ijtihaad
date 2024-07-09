import { Controller, Logger, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  LocalRegister,
  OAuthRegister,
  UpdateMe,
  UpdateUser,
  UserWhereInput,
  UserWhereUniqueInput,
  VerifyUserPassword,
} from '@repo/common';
import { ServiceAuthGuard } from '@repo/shared-svc';
import { UsersService } from './users.service';

@Controller()
@UseGuards(ServiceAuthGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern('users:create')
  create(@Payload('data') data: LocalRegister | OAuthRegister) {
    this.logger.log('users:create');
    return this.usersService.create(data);
  }

  @MessagePattern('users:findMany')
  findMany(@Payload('data') data: UserWhereInput) {
    this.logger.log('users:findMany');
    return this.usersService.findMany();
  }

  @MessagePattern('users:findOne')
  findOne(@Payload('data') data: UserWhereUniqueInput) {
    this.logger.log('users:create');
    return this.usersService.findOne(data);
  }

  @MessagePattern('users:updateUser')
  updateUser(@Payload('data') data: UpdateUser & UserWhereUniqueInput) {
    this.logger.log('users:updateUser');
    return this.usersService.updateUser({ _id: data._id }, data);
  }

  @MessagePattern('users:updateMe')
  updateMe(@Payload('data') data: UpdateMe & UserWhereUniqueInput) {
    this.logger.log('users:updateMe');
    return this.usersService.updateUser({ _id: data._id }, data);
  }

  @MessagePattern('users:delete')
  delete(@Payload('data') data: UserWhereUniqueInput) {
    this.logger.log('users:create');
    return this.usersService.delete(data);
  }

  @MessagePattern('users:verifyUserPassword')
  verifyUserPassword(@Payload('data') data: VerifyUserPassword) {
    this.logger.log('users:create');
    return this.usersService.verifyUserPassword(data);
  }
}
