import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { OtpService } from './otp/otp.service';
import { EmailService } from './email/email.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),AuthModule, PrismaModule],
  providers: [ OtpService, EmailService],
})
export class AppModule {}
