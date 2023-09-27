import { Body, Controller, Param, Patch, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, ChangePasswordDto, ForgotPasswordDto, LoginDto, VerifyOtpDto } from './dto';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signUp(@Body() dto:AuthDto){
        return this.authService.signUp(dto)
    }

    @Post('/signin')
    signIn(@Body() dto:LoginDto){
        return this.authService.signIn(dto)
    }

    @Post('/forgot-password')
    forgotPassword(@Body() dto:ForgotPasswordDto){
        return this.authService.forgotPassword(dto)
    }

    @Post('/verify-otp')
    verifyOtp(@Query('secret') secret: string,@Body() dto:VerifyOtpDto){
        return this.authService.verifyOtp(dto,secret)
    }

    @Patch('/reset-password')
    changePassword(@Body() dto:ChangePasswordDto) {
        return this.authService.changePassword(dto)
    }
}
