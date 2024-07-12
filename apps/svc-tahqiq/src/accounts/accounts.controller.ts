import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Account, _AccountQueryUnique, _UpdateAccount } from '@repo/common';
import { AccountsService } from './accounts.service';

@Controller()
export class AccountsController {
  private readonly logger = new Logger(AccountsController.name);
  constructor(private readonly accountsService: AccountsService) { }

  @EventPattern('accounts:updateAccount')
  updateAccount(@Payload('data') data: _AccountQueryUnique & _UpdateAccount): Promise<Account> {
    throw new Error('Method not implemented.');
  }

  @EventPattern('accounts:delete')
  delete(@Payload('data') data: _AccountQueryUnique): Promise<any> {
    throw new Error('Method not implemented.');
  }
}