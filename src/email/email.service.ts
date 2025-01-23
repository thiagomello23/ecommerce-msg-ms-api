import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer"

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

    async sendEmail() {
        await this.transporter.sendMail({
            from: `<${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: "Hi",
            text: "Hi",
            html: "<b>Hello world!</b>"
        })
    }
}