import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Thought, _CreateThought, _ThoughtQuery, _ThoughtQueryUnique, _UpdateThought } from '@repo/common';
import { ThoughtServiceController } from '@repo/shared-svc';
import { ThoughtService } from './thought.service';

@Controller()
export class ThoughtController implements ThoughtServiceController {
  private readonly logger = new Logger(ThoughtController.name);
  constructor(private readonly thoughtService: ThoughtService) { }

  @MessagePattern('thought:create')
  create(@Payload('data') data: _CreateThought): Promise<Thought> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('thought:findMany')
  findMany(@Payload('data') data: _ThoughtQuery): Promise<Thought[]> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('thought:findOne')
  findOne(@Payload('data') data: _ThoughtQueryUnique & _ThoughtQuery): Promise<Thought> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('thought:updateMyThought')
  updateMyThought(@Payload('data') data: _ThoughtQueryUnique & _UpdateThought): Promise<Thought> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('thought:updateThought')
  updateThought(@Payload('data') data: _ThoughtQueryUnique & _UpdateThought): Promise<Thought> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('thought:delete')
  delete(@Payload('data') data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}