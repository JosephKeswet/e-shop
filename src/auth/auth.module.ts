import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';
import { OtpService } from 'src/otp/otp.service';
import { EmailService } from 'src/email/email.service';

@Module({
  providers: [AuthService,JwtService,EmailService,OtpService],
  controllers: [AuthController]
})
export class AuthModule {}
