import { Body, Controller, Delete, Get, Param, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guard/jwt.guard';
import { ChangePassword } from './dtos/change-password.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Get('info')
    async getUserDetails(@Req() req) {
        try {
            let user: User = req.user
            return {
                status: 'success',
                data: user
            }
        } catch (error) {
            return {
                status: 'failed',
                message: error.message
            }
        }
    }

    @Put('update')
    async updateUser(@Body() payload: UpdateUserDto, @Req() req) {
        return this.userService.updateUser(payload, req.user.id)
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: number ,@Req() req) {
        let role: string = req.user.role
        return role == 'admin' ? this.userService.deleteUser(id) : new UnauthorizedException('Admin Only')
    }

    @Put('password/change')
    async changePassword(@Body() payload: ChangePassword, @Req() req) {
        let id: number = req.user.id
        let hashed: string = req.user.password
        return this.userService.changePassword(id, payload, hashed)
    }
}
