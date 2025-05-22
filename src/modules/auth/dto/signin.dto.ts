import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must be at least 3 characters long' })
    username: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MinLength(3, { message: 'Email must be at least 3 characters long' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}