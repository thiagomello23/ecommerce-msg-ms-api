import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SendEmailRecuperationAccount {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    token: string;
}