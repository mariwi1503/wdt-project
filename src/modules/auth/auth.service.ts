import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HashPassword, ValidatePassword } from 'src/shared/utils/bcrypt';
import { Repository } from 'typeorm';
import { User, User_status } from '../user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/signup.dto';

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

}
