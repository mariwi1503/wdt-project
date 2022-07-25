import { IsNotEmpty, MinLength } from "class-validator"
import { Platform } from "../auth.service"

export class SendOtpDto {
    @IsNotEmpty()
    @MinLength(10)
    phone: string

    @IsNotEmpty()
    platform: Platform
}