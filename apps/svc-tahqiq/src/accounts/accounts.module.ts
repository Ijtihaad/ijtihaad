import { ACCOUNT_MODEL_NAME, AccountSchema } from '@/schemas/account.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ACCOUNT_MODEL_NAME, schema: AccountSchema },
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule { }
