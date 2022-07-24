import { IsNotEmpty, MinLength } from "class-validator"

export class ChangePassword {
    @IsNotEmpty()
    @MinLength(6)
    old_password: string

    @IsNotEmpty()
    @MinLength(6)
    new_password: string
}