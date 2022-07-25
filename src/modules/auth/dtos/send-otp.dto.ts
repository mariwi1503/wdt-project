import { IsNotEmpty, MinLength } from "class-validator"
import { IsPhoneNumber } from "src/shared/utils/validation"
import { Platform } from "../auth.service"

export class SendOtpDto {
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string

    @IsNotEmpty()
    platform: Platform
}