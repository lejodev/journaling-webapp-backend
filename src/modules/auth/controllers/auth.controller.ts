import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { AuthService } from '../services/auth/auth.service';
import { SignInDto } from '../dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authservice: AuthService,
  ) {}

  @Post('/signup')
  signUp(@Body() user: User) {
    return this.authservice.signUp(user);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto) {
    console.log("signInDto", signInDto);

    return this.authservice.signIn(signInDto);
  }
}
