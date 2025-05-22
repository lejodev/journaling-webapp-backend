import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';

@Module({
  controllers: [UserController],
  providers: [UserService, WrapperService],
})
export class UserModule {}
