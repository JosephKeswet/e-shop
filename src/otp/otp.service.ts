import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';

@Injectable()
export class OtpService {
  private otpCode: string; 
  constructor() {}

  async generateKey() {
    var secret = speakeasy.generateSecret({ length: 20 }).base32;
    var otp =  await this.generateOtp(secret);
    this.otpCode = otp;
    return {
      secret,
      otp,
    };
  }

  generateOtp(otpSecret: string) {
    // Generate a time-based token based on the base-32 key.
    // HOTP (counter-based tokens) can also be used if `totp` is replaced by
    // `hotp` (i.e. speakeasy.hotp()) and a `counter` is given in the options.
    var token = speakeasy.totp({
      secret:otpSecret,
      encoding: 'base32',
    });

    return token;
  }

  verifyOtp(code: string,secret:string) {
    // Verify a given token
    // console.log(code,secret)
    var tokenValidates = speakeasy.totp.verify({
      secret:secret,
      encoding: 'base32',
      token:code,
      window: 20,
    });
    // Returns true if the token matches

    if (tokenValidates) {
      return {
        success:true,
        msg:'Your verification was successful'
      }
    } else {
      return {
        success:false,
        msg:'Invalid verification code'
      }
    }
  }

  getStoredOtpCode() {
    return this.otpCode;
  }
}
