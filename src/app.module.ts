import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { JournalModule } from './modules/journal/journal.module';
import { WrapperService } from './core/services/wrapper/wrapper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journal } from './modules/journal/entities/journal.entity';
import { User } from './modules/user/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      // Temporarily hardcodd data, this will be in ENV
      {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '0000',
        database: 'journalingdb',
        entities: [Journal, User],
        // synchronize: true,
      },
    ),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    UserModule,
    JournalModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    WrapperService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
