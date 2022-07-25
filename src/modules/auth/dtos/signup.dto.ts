import { IsNotEmpty, MinLength } from "class-validator"
import { IsNumeric, IsPhoneNumber } from "src/shared/utils/validation"

export class SignupDto {
    @IsNotEmpty({ message: 'Fullname tidak boleh kosong'})
    fullname: string

    @IsNotEmpty({ message: 'Phone tidak boleh kosong'})
    @IsPhoneNumber()
    phone: string

    @IsNotEmpty({ message: 'Password tidak boleh kosong'})
    @MinLength(6)
    password: string
}