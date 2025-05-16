import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { JournalModule } from './modules/journal/journal.module';
import { WrapperService } from './core/services/wrapper/wrapper.service';

@Module({
  imports: [
    UserModule,
    JournalModule],
  controllers: [AppController],
  providers: [AppService, WrapperService],
})
export class AppModule { }
