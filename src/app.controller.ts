import { Controller } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { EmailService } from "./email/email.service";
import { SendEmailVerification } from "./dto/send-email-verification.dto";
@Controller()
export class AppController {

    constructor(
        private readonly emailService: EmailService
    ){}

    @MessagePattern("SEND_EMAIL_ACCOUNT_VERIFICATION")
    async getUser(@Payload() data: SendEmailVerification, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        await this.emailService.sendEmail(data)
        channel.ack(originalMsg);
        return {
            message: "Email send with success!"
        }
    }

}