import { IsOptional } from "class-validator";

export class UpdateGenreDto {
    @IsOptional()
    title: string

    @IsOptional()
    description: string
}