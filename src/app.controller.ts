import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { EmailService } from "./email/email.service";
@Controller()
export class AppController {

    constructor(
        private readonly emailService: EmailService
    ){}

    @MessagePattern("SEND_EMAIL_ACCOUNT_VERIFICATION")
    async getUser(@Payload() data:any) {
        await this.emailService.sendEmail()
        return "Email Send with success!"
    }

}