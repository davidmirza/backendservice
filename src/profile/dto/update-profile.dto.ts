import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, MaxDate } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter correct email'})
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly displayname: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly firstname: string;

    @ApiProperty()
    readonly lastname: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly gender: string;

    @ApiProperty()
    @Transform(( {value}) => new Date(value))
    @IsDate()
    @MaxDate(new Date())
    readonly birthday: Date;

    @ApiProperty()
    @Type(() => Number)
    readonly height: number;

    @ApiProperty()
    @Type(() => Number)
    readonly weight: number;
}
