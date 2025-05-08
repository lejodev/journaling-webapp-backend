import { Module } from '@nestjs/common';
import { JournalService } from './services/journal.service';
import { JournalController } from './controllers/journal.controller';

@Module({
  controllers: [JournalController],
  providers: [JournalService],
})
export class JournalModule {}
