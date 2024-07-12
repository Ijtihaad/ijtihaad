import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { THOUGHT_MODEL_NAME, ThoughtSchema } from '../schemas/thought.schema';
import { ThoughtController } from './thought.controller';
import { ThoughtService } from './thought.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: THOUGHT_MODEL_NAME, schema: ThoughtSchema },
    ]),
  ],
  controllers: [ThoughtController],
  providers: [ThoughtService],
})
export class ThoughtModule { }
