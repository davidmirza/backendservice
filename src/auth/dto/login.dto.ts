import {IsEmail,IsNotEmpty,IsString,MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class LoginDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct email' })
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string;
}

