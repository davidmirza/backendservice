import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateJoinDto  {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter correct email'})
    readonly email: string;
    
    @ApiProperty()
    @IsNotEmpty()
    readonly room:string;
}
