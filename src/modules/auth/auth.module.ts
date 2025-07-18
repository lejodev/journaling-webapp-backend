import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { JwtHelper } from './services/jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtHelper, WrapperService],
  imports: [
    JwtModule.register({
      secret: 'temporarySecret',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  exports: [JwtHelper],
})
export class AuthModule {}
