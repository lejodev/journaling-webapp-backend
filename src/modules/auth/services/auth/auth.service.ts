import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from '../../dto/signin.dto';
import { firstValueFrom } from 'rxjs';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private wrapperService: WrapperService) { }

    async signIn(signInDto: SignInDto) {
        try {
            console.log(signInDto, '********');

            const username = signInDto.username?.trim();
            const password = signInDto.password?.trim();

            if (!username || !password) {
                throw new UnauthorizedException('Username and password are required');
            }

            const userObservable = this.wrapperService.findOne(User, { username: username })

            const user = await firstValueFrom(userObservable);
            console.log(user);


            if (!user) {
                console.log("In credentials");

                throw new UnauthorizedException('Invalid credentials');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                console.log("In credentials password");
                throw new UnauthorizedException('Invalid credentials');
            }

            delete user.password;

            return {
                user,
                message: 'Login successful'
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
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            return this.userService.create(user);
        } catch (error) {
            console.log("ERRORasasassas", error);
            return{message: "carechimba"}
            
        }
    }
}
