import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, ChangePasswordDto, ForgotPasswordDto, LoginDto, VerifyOtpDto } from './dto';
import * as argon from 'argon2';
import * as client from 'whatsapp-web.js'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OtpService } from 'src/otp/otp.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private emailService: EmailService,
    private otpService:OtpService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {

      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          email:dto.email,
          hash,
          phoneNumber: dto.phoneNumber,
        },
      });

      delete user.hash;
      const accessToken = await this.validateUser(dto)
      Object.assign(user,accessToken)


      return {
        ...user,
        msg:'You have successfully signed up'
      };
    } catch (error) {

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return {
            msg:"Credentials are taken"
          }
        }
      }
      throw error;
    }
  }

  async signIn(dto: LoginDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Credentials not found');
    }
    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) {
      throw new ForbiddenException('Password is incorrect');
    }

    const accessToken = await this.signToken(user.id, user.username);
    Object.assign(user, accessToken);
    delete user.hash;

    // send back user
    return {
      success: true,
      msg: 'You have successfully signed in',
        ...user
    };
  }

  // This is to request for a password reset
  async forgotPassword(dto:ForgotPasswordDto) {
    return this.sendOtp(dto.email)
  }

  async sendOtp(email:string) {
    const verificationInfo = await this.otpService.generateKey()


    return this.emailService.sendEmail(email,'OTP Verification',`Your verification OTP for e-shop is ${verificationInfo.otp} and ${verificationInfo.secret}`)
  }

  async verifyOtp(dto:VerifyOtpDto,secret:string) {
    return this.otpService.verifyOtp(dto.code,secret)
  }

  async changePassword(dto:ChangePasswordDto) {
    const storedOtpCode = this.otpService.getStoredOtpCode();

    if (!storedOtpCode) {
      return {
        success: false,
        msg: 'OTP code not found. Please generate an OTP first.',
      };
    }
    const hash = await argon.hash(dto.newPassword);

    const user = await this.prisma.user.update({
      where:{
        email:dto.email
      },
      data:{
        hash
      }
    })

    delete user.hash;
    
    return user;
  }
  // This abstracts the signToken to retrieve the access token
  async validateUser(dto: AuthDto): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Credentials not found');
    }
    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) {
      throw new ForbiddenException('Password is incorrect');
    }
    // const password = await argon.verify(user.hash,'password');

    return this.signToken(user.id, user.username);
  }

  // This is for retrieving the jwt token
  async signToken(
    userId: number,
    username: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      username,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret,
    });

    return {
      accessToken: token,
    };
  }
}
