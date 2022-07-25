import { IsNotEmpty, Length, MinLength } from "class-validator";

export class SetNewPasswordDto {
    @IsNotEmpty()
    @Length(4)
    code: string

    @IsNotEmpty()
    @MinLength(10)
    phone: string

    @IsNotEmpty()
    @MinLength(6)
    new_password: string
}