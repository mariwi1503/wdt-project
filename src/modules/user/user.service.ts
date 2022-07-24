import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashPassword, ValidatePassword } from 'src/shared/utils/bcrypt';
import { Repository } from 'typeorm';
import { ChangePassword } from './dtos/change-password.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async findUserById(id: number) {
        return await this.userRepository.findOne({where: {id}})
    }

    async updateUser(payload: UpdateUserDto, id: number) {
        try {
            let { fullname, phone } = payload
            let new_data: UpdateUserDto;

            if(fullname) new_data.fullname = fullname
            if(phone) new_data.phone = phone

            await this.userRepository.update({id}, new_data)
            return {
                status: 'success'
            }
        } catch (error) {
            return {
                status: 'success',
            }
        }
    }

    async deleteUser(id: number) {
        try {
            console.log(id)
            await this.userRepository.delete({id})
            return {
                status: 'success'
            }
        } catch (error) {
            return {
                status: 'success',
            }
        }
    }

    async changePassword(id: number, payload: ChangePassword, hashed: string) {
        try {
            let { old_password, new_password } = payload

            // check old password
            let validate = ValidatePassword(old_password, hashed)
            if(!validate) throw new BadRequestException('Password lama salah')

            new_password = HashPassword(new_password)
            await this.userRepository.update({id}, {password: new_password})

            return {
                status: 'success'
            }
        } catch (error) {
            return {
                status: 'failed',
            }
        }

    }
}
