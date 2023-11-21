import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateMessageDto  {
    readonly email: string;
    readonly user:string;
    readonly content:string;
}
