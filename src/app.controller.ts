import { Controller } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { EmailService } from "./email/email.service";
import { SendEmailVerification } from "./dto/send-email-verification.dto";
import { SendSMSVerification } from "./dto/send-sms-verification.dto";
import { TwilioService } from "./twilio/twilio.service";
@Controller()
export class AppController {

    constructor(
        private readonly emailService: EmailService,
        private readonly twilioService: TwilioService
    ){}

    @MessagePattern("SEND_EMAIL_ACCOUNT_VERIFICATION")
    async sendEmailAccountVerification(@Payload() data: SendEmailVerification, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        await this.emailService.sendEmailVerificationCode(data)
        channel.ack(originalMsg);
        return {
            message: "Email send with success!"
        }
    }

    @MessagePattern("SEND_PHONENUMBER_ACCOUNT_VERIFICATION")
    async sendPhoneNumberAccountVerification(
        @Payload() data: SendSMSVerification, @Ctx() context: RmqContext
    ) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        await this.twilioService.sendSmsVerificationCode(data)
        channel.ack(originalMsg);
        return {
            message: "SMS send with success!"
        }
    }
}