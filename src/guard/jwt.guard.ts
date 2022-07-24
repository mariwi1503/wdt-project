import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}

// class ini supaya tidak perlu menuliskan AuthGuard('jwt') di setiap guard yang akan dipasang di setiap controller