import { Test, TestingModule } from '@nestjs/testing';
import { JamasController } from './jamas.controller';
import { JamasService } from './jamas.service';

describe('JamasController', () => {
  let jamasController: JamasController;

  beforeEach(async () => {
    const jamas: TestingModule = await Test.createTestingModule({
      controllers: [JamasController],
      providers: [JamasService],
    }).compile();

    jamasController = jamas.get<JamasController>(JamasController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(jamasController.getHello()).toBe('Hello World!');
    });
  });
});
