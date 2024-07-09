import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateJama, Jama, JamaWhereInput, JamaWhereUniqueInput, UpdateJama, UpdateMyJama } from '@repo/common';
import { JamasServiceController } from '@repo/shared-svc';
import { JamasService } from './jamas.service';

@Controller()
export class JamasController implements JamasServiceController {
  private readonly logger = new Logger(JamasController.name);
  constructor(private readonly jamasService: JamasService) { }

  @MessagePattern('jamas:create')
  create(@Payload('data') data: CreateJama): Promise<Jama> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('jamas:findMany')
  findMany(@Payload('data') data: JamaWhereInput): Promise<Jama[]> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('jamas:findOne')
  findOne(@Payload('data') data: JamaWhereUniqueInput): Promise<Jama> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('jamas:updateJama')
  updateMyJama(@Payload('data') data: JamaWhereUniqueInput & UpdateMyJama): Promise<Jama> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('jamas:updateJama')
  updateJama(@Payload('data') data: JamaWhereUniqueInput & UpdateJama): Promise<Jama> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('jamas:delete')
  delete(@Payload('data') data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}