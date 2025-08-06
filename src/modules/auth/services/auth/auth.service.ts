import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from '../../dto/signin.dto';
import { firstValueFrom } from 'rxjs';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { JwtHelper } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private wrapperService: WrapperService,
    private jwtHelper: JwtHelper,
  ) {}

  async signIn(signInDto: SignInDto) {
    try {
      console.log(signInDto, '********');

      const username = signInDto.username?.trim();
      const password = signInDto.password?.trim();

      console.log(username, password);
      

      if (!username || !password) {
        throw new UnauthorizedException('Username and password are required');
      }

      const userObservable = this.wrapperService.findOne(User, 
        {username},
      );

      const user = await firstValueFrom(userObservable);
      console.log("dasdsadsadsa****",user);

      if (!user) {
        console.log('In credentials');

        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordhash);

      if (!isPasswordValid) {
        console.log('In credentials password');
        throw new UnauthorizedException('Invalid credentials');
      }

      delete user.passwordhash;

      const payload = { ...user };

      const token = this.jwtHelper.sign(payload);

      console.log('TOKEN', token);

      return {
        message: 'success',
        token: token,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('An error occurred during sign in');
    }
  }

  async signUp(user: User) {
    try {
      console.log("HERE");
      
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.passwordhash, salt);
      user.passwordhash = hashedPassword;
      return this.userService.create(user);
    } catch (error) {
      console.log('ERRORasasassas', error);
      return { message: 'Error while signup' };
    }
  }
}
