import { IsNotEmpty, MinLength } from "class-validator";
import { IsNumeric } from "src/shared/utils/validation";

export class LoginDto {
    @IsNotEmpty({ message: 'Phone tidak boleh kosong'})
    @MinLength(10)
    @IsNumeric({ message: 'Phone harus berupa angka'})
    phone: string

    @IsNotEmpty({message: 'Password tidak boleh kosong'})
    @MinLength(6)
    password: string

}