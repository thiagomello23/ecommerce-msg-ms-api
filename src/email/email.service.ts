import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer"
import { SendEmailVerification } from "src/dto/send-email-verification.dto";

@Injectable()
export class EmailService {

    private transporter: any;

    constructor(){
        this.transporter = nodemailer.createTransport({
            service: process.env.EMAIL_TRANSPORTER_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }

    async sendEmailVerificationCode(data: SendEmailVerification) {
        await this.transporter.sendMail({
            from: `<${process.env.EMAIL_USER}>`,
            to: data.userEmail,
            subject: "Email verification",
            text: "Account email verification",
            html: `
                <div>
                    <h3>
                        Hi ${data.firstName}, Your code for account verification is: ${data.verificationCode}
                    </h3>
                </div>
            `
        })
    }
}