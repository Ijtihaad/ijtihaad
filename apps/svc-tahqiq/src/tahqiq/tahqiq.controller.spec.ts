import { Test, TestingModule } from '@nestjs/testing';
import { TahqiqController } from './tahqiq.controller';
import { TahqiqService } from './tahqiq.service';

describe('TahqiqController', () => {
  let tahqiqController: TahqiqController;

  beforeEach(async () => {
    const tahqiq: TestingModule = await Test.createTestingModule({
      controllers: [TahqiqController],
      providers: [TahqiqService],
    }).compile();

    tahqiqController = tahqiq.get<TahqiqController>(TahqiqController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(tahqiqController.getHello()).toBe('Hello World!');
    });
  });
});
