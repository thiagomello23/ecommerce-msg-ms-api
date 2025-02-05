import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SendEmailVerification {
    @IsEmail()
    userEmail: string;

    @IsString()
    @IsNotEmpty()
    verificationCode: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;
}