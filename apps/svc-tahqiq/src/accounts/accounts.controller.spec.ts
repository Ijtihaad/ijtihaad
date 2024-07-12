import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

describe('AccountsController', () => {
  let accountsController: AccountsController;

  beforeEach(async () => {
    const accounts: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [AccountsService],
    }).compile();

    accountsController = accounts.get<AccountsController>(AccountsController);
  });

  describe('root', () => {
    // it('should return "Hello World!"', () => {
    //   expect(accountsController.getHello()).toBe('Hello World!');
    // });
  });
});
