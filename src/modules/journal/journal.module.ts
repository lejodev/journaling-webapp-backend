import { Module } from '@nestjs/common';
import { JournalService } from './services/journal.service';
import { JournalController } from './controllers/journal.controller';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';

@Module({
  controllers: [JournalController],
  providers: [JournalService,
    WrapperService
  ],
})
export class JournalModule {}
