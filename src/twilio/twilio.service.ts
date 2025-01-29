import { Injectable } from "@nestjs/common";
import { SendSMSVerification } from "src/dto/send-sms-verification.dto";
import * as twilio from "twilio"

@Injectable()
export class TwilioService {

    private twilioClient: twilio.Twilio;

    constructor(){
        this.twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    }

    async sendSmsVerificationCode(data: SendSMSVerification) {
        await this.twilioClient.messages.create({
            body: `Hi ${data.firstName + "" + data.lastName}, Your code for account verification is: ${data.verificationCode}`,
            from: process.env.TWILIO_PHONENUMBER,
            to: data.phoneNumber
        })
    }
}