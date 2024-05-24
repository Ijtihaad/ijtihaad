import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import {
  UpdateMe,
  UpdateUser,
  LocalRegister,
  UserWhereInput,
  UserWhereUniqueInput,
  VerifyUserPassword,
  OAuthRegister
} from "@repo/common";
import { UsersServiceController } from "@repo/shared-svc";
import { ServiceRequest } from "@repo/shared-svc/dist/interfaces/request.interface";
import { UsersService } from "./users.service";

@Controller()
export class UsersController implements UsersServiceController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern("users:create")
  create(@Payload() { data }: ServiceRequest<LocalRegister | OAuthRegister>) {
    this.logger.log("users:create")
    return this.usersService.create(data);
  }

  @MessagePattern("users:findMany")
  findMany(@Payload() { data }: ServiceRequest<UserWhereInput>) {
    this.logger.log("users:findMany")
    return this.usersService.findMany();
  }

  @MessagePattern("users:findOne")
  findOne(@Payload() { data }: ServiceRequest<UserWhereUniqueInput>) {
    this.logger.log("users:create")
    return this.usersService.findOne(data);
  }

  @MessagePattern("users:updateUser")
  updateUser(
    @Payload() { data }: ServiceRequest<UpdateUser & UserWhereUniqueInput>
  ) {
    this.logger.log("users:updateUser")
    return this.usersService.updateUser({ id: data.id }, data);
  }

  @MessagePattern("users:updateMe")
  updateMe(
    @Payload() { data }: ServiceRequest<UpdateMe & UserWhereUniqueInput>
  ) {
    this.logger.log("users:updateMe")
    return this.usersService.updateMe({ id: data.id }, data);
  }

  @MessagePattern("users:delete")
  delete(@Payload() { data }: ServiceRequest<UserWhereUniqueInput>) {
    this.logger.log("users:create")
    return this.usersService.delete(data);
  }

  @MessagePattern("users:verifyUserPassword")
  verifyUserPassword(
    @Payload() { data }: ServiceRequest<VerifyUserPassword>
  ) {
    this.logger.log("users:create")
    return this.usersService.verifyUserPassword(data);
  }
}
