import { Module } from '@nestjs/common';
import { JournalService } from './services/journal.service';
import { JournalController } from './controllers/journal.controller';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [JournalController],
  providers: [JournalService, WrapperService, JwtService],
})
export class JournalModule {}
