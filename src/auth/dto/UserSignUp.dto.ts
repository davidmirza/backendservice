import {IsEmail,IsNotEmpty,IsString,MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class UserSignUpDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter correct email'})
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'username is empty' })
    readonly username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8,{ message: 'Password min 8 characters' })
    readonly password: string;
}