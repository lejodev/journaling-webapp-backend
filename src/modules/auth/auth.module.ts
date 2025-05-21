import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UserService } from '../user/services/user.service';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService,
    UserService, WrapperService
  ]
})
export class AuthModule {}
