import { IsNotEmpty, IsString, MinLength, IsOptional, IsBoolean, isString, IsNumber } from 'class-validator';

export class CreateJournalDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10, { message: 'Content must be at least 10 characters long' })
    content: string;

    @IsNumber()
    @IsBoolean()
    @IsNotEmpty()
    userId: number
}

