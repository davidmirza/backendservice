import {IsNotEmpty} from 'class-validator';

export class IsLoginDTO{

    @IsNotEmpty()
    readonly token:string;
}