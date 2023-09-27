import { Injectable } from '@nestjs/common';
const Twilio = require('twilio');

@Injectable()
export class WhatsappService {
  private twilioClient: any;

  constructor() {
    this.twilioClient = new Twilio('ACad0487ab8dbc0434af62d84777576cdd', '862e14f7c0b8d65f070dd1fe30c516d0');
  }

  async sendWhatsAppMessage(phoneNumber: string, message: string) {
    try {
      await this.twilioClient.messages.create({
        to: `whatsapp:${phoneNumber}`,
        from: `whatsapp:+14155238886`,
        body: message,
      });

      return 'WhatsApp message sent successfully';
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }
}
