import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HashPassword, ValidatePassword } from 'src/shared/utils/bcrypt';
import { Otp } from 'src/shared/utils/otp';
import { Repository } from 'typeorm';
import { User, User_role, User_status } from '../user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { SendOtpDto } from './dtos/send-otp.dto';
import { SignupDto } from './dtos/signup.dto';
import { SetNewPasswordDto } from './dtos/set-password.dto';

export enum Platform {
    "whatsapp" = "whatsapp",
    "sms" = "sms"
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly authRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async signUp(signUpDto: SignupDto) {
        try {
            let { fullname, phone, password } = signUpDto

            let user = await this.authRepository.findOne({where: {phone}})
            if(user) throw new BadRequestException('Nomor sudah terdaftar')

            // hash and secure password
            password = HashPassword(password)

            let new_user = this.authRepository.create()
            new_user.fullname = fullname
            new_user.phone = phone
            new_user.password = password

            // set default status to active
            new_user.status = User_status.active
            // user default role is user
            new_user.role = User_role.user

            await this.authRepository.save(new_user)

            return {
                status: 'success',
                id: new_user.id
            }
        } catch (error) {
            return {
                status: 'failed',
                message: error.message
            }
        }
    }

    async login(loginDto: LoginDto) {
        try {
            let { phone, password } = loginDto
            let user = await this.authRepository.findOne({where: {phone}})
            if(!user) throw new BadRequestException('Nomor telephone belum terdaftar')

            // verify password
            let verify = ValidatePassword(password, user.password)
            if(!verify) throw new BadRequestException('Password yang anda masukkan salah')

            //generate token
            let payload = {
                sub: user.id
            }

            let token = this.jwtService.sign(payload)
            return {
                status: 'success',
                token
            }
        } catch (error) {
            return {
                status: 'failed',
                message: error.message
            }
        }
    }

    async sendOtp(sendOtp: SendOtpDto) {
        try {
            let { phone, platform } = sendOtp

            let user = await this.authRepository.findOne({where: {phone}})
            if(!user) throw new BadRequestException('Nomor telephone belum terdaftar')
            // generate token
            let otp_code = Otp.GenerateToken(4)
            await this.authRepository.update({id: user.id}, {temp_otp: otp_code})

            // untuk sekarang otp di keluarin di respons karena tidak punya akun twillio
            return {
                status: 'success',
                send_via: platform,
                otp: otp_code
            }
        
        } catch (error) {
            return {
                status: 'failed',
                message: error.message
            }
        }
    }

    async forgotPassword(payload: SetNewPasswordDto) {
        try {
            let { code, phone, new_password } = payload
            let user = await this.authRepository.findOne({ where: {phone}})
            if(!user) throw new BadRequestException('Nomor telephone belum terdaftar')

            let verified = await this.verifyOtp(code, user.temp_otp)
            if(!verified) throw new BadRequestException('Code otp salah')

            let hashedPassword: string = HashPassword(new_password)

            // set new password and set temp_otp to null
            await this.authRepository.update({id: user.id}, {password: hashedPassword, temp_otp: null})

            return {
                status: 'success'
            }
        } catch (error) {
            return {
                status: 'failed',
                message: error.message
            }
        }
    }

    async verifyOtp(otp: string, temp_otp: string) {
        return otp == temp_otp ? true : false
    }
}
