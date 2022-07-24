import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {}
