import { IsOptional } from "class-validator"

export class UpdateUserDto {
    @IsOptional()
    fullname: string

    @IsOptional()
    phone: string
}