import { Test, TestingModule } from '@nestjs/testing';
import { WrapperService } from './wrapper.service';

describe('WrapperService', () => {
  let service: WrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WrapperService],
    }).compile();

    service = module.get<WrapperService>(WrapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
