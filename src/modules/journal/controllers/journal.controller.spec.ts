import { Test, TestingModule } from '@nestjs/testing';
import { JournalController } from './journal.controller';
import { JournalService } from '../services/journal.service';

describe('JournalController', () => {
  let controller: JournalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JournalController],
      providers: [JournalService],
    }).compile();

    controller = module.get<JournalController>(JournalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
