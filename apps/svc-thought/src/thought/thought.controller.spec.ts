import { Test, TestingModule } from '@nestjs/testing';
import { ThoughtController } from './thought.controller';
import { ThoughtService } from './thought.service';

describe('ThoughtController', () => {
  let thoughtController: ThoughtController;

  beforeEach(async () => {
    const thought: TestingModule = await Test.createTestingModule({
      controllers: [ThoughtController],
      providers: [ThoughtService],
    }).compile();

    thoughtController = thought.get<ThoughtController>(ThoughtController);
  });

  describe('root', () => {
    // it('should return "Hello World!"', () => {
    //   expect(thoughtController.getHello()).toBe('Hello World!');
    // });
  });
});
