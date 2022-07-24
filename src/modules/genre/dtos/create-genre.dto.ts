import { IsNotEmpty, IsOptional, minLength, MinLength } from "class-validator";

export class CreateGenreDto {
    @IsNotEmpty()
    @MinLength(3)
    title: string

    @IsNotEmpty()
    @MinLength(15)
    description: string
}