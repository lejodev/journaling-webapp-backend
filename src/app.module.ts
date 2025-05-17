import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { JournalModule } from './modules/journal/journal.module';
import { WrapperService } from './core/services/wrapper/wrapper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journal } from './modules/journal/entities/journal.entity';
import { User } from './modules/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "root",
        database: "Journal-public",
        entities: [Journal, User],
        // synchronize: true,
      },
    ),
    UserModule,
    JournalModule],
  controllers: [AppController],
  providers: [AppService, WrapperService],
})
export class AppModule { }
