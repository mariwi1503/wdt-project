import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SendOtpDto } from './dtos/send-otp.dto';
import { SetNewPasswordDto } from './dtos/set-password.dto';
import { SignupDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('signup')
    async signup(@Body() signUpDto: SignupDto) {
        return this.authService.signUp(signUpDto)
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @Post('send-otp')
    async sendOtp(@Body() payload: SendOtpDto) {
        return this.authService.sendOtp(payload)
    }

    @Post('forgot-password')
    async forgotPassword(@Body() payload: SetNewPasswordDto) {
        return this.authService.forgotPassword(payload)
    }
}
