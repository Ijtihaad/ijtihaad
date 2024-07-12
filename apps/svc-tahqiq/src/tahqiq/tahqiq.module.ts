import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tahqiq, TahqiqSchema } from '../schemas/tahqiq.schema';
import { TahqiqController } from './tahqiq.controller';
import { TahqiqService } from './tahqiq.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tahqiq.name, schema: TahqiqSchema },
    ]),
  ],
  controllers: [TahqiqController],
  providers: [TahqiqService],
})
export class TahqiqModule { }
