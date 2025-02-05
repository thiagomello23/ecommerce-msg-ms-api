import { IsNotEmpty, IsString, Matches } from "class-validator";

export class SendSMSVerification {
    @Matches(/^\+?[1-9]\d{1,14}$/)
    phoneNumber: string;

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