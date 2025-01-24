import { Controller } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { EmailService } from "./email/email.service";
@Controller()
export class AppController {

    constructor(
        private readonly emailService: EmailService
    ){}

    @MessagePattern("SEND_EMAIL_ACCOUNT_VERIFICATION")
    async getUser(@Payload() data:any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
      
        // await this.emailService.sendEmail()
        channel.ack(originalMsg);
        return "Email Send with success!"
    }

}