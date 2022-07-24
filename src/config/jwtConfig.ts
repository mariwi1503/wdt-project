import { JwtModuleOptions } from "@nestjs/jwt";
import { config } from '.';

export const jwtConfig: JwtModuleOptions = {
    secret: config.token_secret,
    signOptions: {
        expiresIn: 3600
    }
}