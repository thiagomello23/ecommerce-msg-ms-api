import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer"
import { SendEmailRecuperationAccount } from "src/email/dto/send-email-recuperation-account.dto";
import { SendEmailVerification } from "src/email/dto/send-email-verification.dto";

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

    async sendEmailRecuperationAccount(
        data: SendEmailRecuperationAccount
    ) {
        await this.transporter.sendMail({
            from: `${process.env.EMAIL_USER}`,
            to: data.email,
            subject: "Email recuperation account",
            text: "Email to change password",
            html: `
                <div>
                    <h3>
                        Hi ${data.firstName}, click here to redefine your password:
                    </h3>
                    <a href="${process.env.FRONTEND_URL}/reset-password?token=${data.token}">
                        <bold>RESET PASSWORD</bold>
                    </a>
                </div>
            `
        })
    }
}