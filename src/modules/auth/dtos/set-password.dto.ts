import { IsNotEmpty, Length, MinLength } from "class-validator";
import { IsPhoneNumber } from "src/shared/utils/validation";

export class SetNewPasswordDto {
    @IsNotEmpty()
    @Length(4)
    code: string

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string

    @IsNotEmpty()
    @MinLength(6)
    new_password: string
}