import { Controller, Logger, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  _Register,
  _UpdateMe,
  _UpdateUser,
  _UserQuery,
  _UserQueryUnique,
  _VerifyUserPassword,
} from '@repo/common';
import { ServiceAuthGuard } from '@repo/shared-svc';
import { UsersService } from './users.service';

@Controller()
@UseGuards(ServiceAuthGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern('users:create')
  create(@Payload('data') data: _Register) {
    this.logger.log('users:create');
    return this.usersService.create(data);
  }

  @MessagePattern('users:findMany')
  findMany(@Payload('data') data: _UserQuery) {
    this.logger.log('users:findMany');
    return this.usersService.findMany();
  }

  @MessagePattern('users:findOne')
  findOne(@Payload('data') data: _UserQueryUnique) {
    this.logger.log('users:create');
    return this.usersService.findOne(data);
  }

  @MessagePattern('users:updateUser')
  updateUser(@Payload('data') data: _UpdateUser & _UserQueryUnique) {
    this.logger.log('users:updateUser');
    return this.usersService.updateUser({ _id: data._id }, data);
  }

  @MessagePattern('users:updateMe')
  updateMe(@Payload('data') data: _UpdateMe & _UserQueryUnique) {
    this.logger.log('users:updateMe');
    return this.usersService.updateUser({ _id: data._id }, data);
  }

  @MessagePattern('users:delete')
  delete(@Payload('data') data: _UserQueryUnique) {
    this.logger.log('users:create');
    return this.usersService.delete(data);
  }

  @MessagePattern('users:verifyUserPassword')
  verifyUserPassword(@Payload('data') data: _VerifyUserPassword) {
    this.logger.log('users:create');
    return this.usersService.verifyUserPassword(data);
  }
}
