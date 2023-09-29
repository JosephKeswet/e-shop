import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { OtpService } from 'src/otp/otp.service';
import { EmailService } from 'src/email/email.service';
import { JwtStrategy } from './strategy';

@Module({
  imports:[JwtModule.register({})],
  providers: [AuthService,JwtService,EmailService,OtpService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
