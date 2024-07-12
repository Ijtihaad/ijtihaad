import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTahqiq, Tahqiq, TahqiqWhereInput, TahqiqWhereUniqueInput, UpdateMyTahqiq, UpdateTahqiq } from '@repo/common';
import { TahqiqServiceController } from '@repo/shared-svc';
import { TahqiqService } from './tahqiq.service';

@Controller()
export class TahqiqController implements TahqiqServiceController {
  private readonly logger = new Logger(TahqiqController.name);
  constructor(private readonly tahqiqService: TahqiqService) { }

  @MessagePattern('tahqiq:create')
  create(@Payload('data') data: CreateTahqiq): Promise<Tahqiq> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('tahqiq:findMany')
  findMany(@Payload('data') data: TahqiqWhereInput): Promise<Tahqiq[]> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('tahqiq:findOne')
  findOne(@Payload('data') data: TahqiqWhereUniqueInput): Promise<Tahqiq> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('tahqiq:updateMyTahqiq')
  updateMyTahqiq(@Payload('data') data: TahqiqWhereUniqueInput & UpdateMyTahqiq): Promise<Tahqiq> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('tahqiq:updateTahqiq')
  updateTahqiq(@Payload('data') data: TahqiqWhereUniqueInput & UpdateTahqiq): Promise<Tahqiq> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('tahqiq:delete')
  delete(@Payload('data') data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}