// email.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'jhezekiah19@gmail.com',
        pass: 'qcqqsdzdwzkyzjwr',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'jhezekiah19@gmail.com',
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return {
        success:true,
        msg:'Email sent successfully'
      }
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
