import { IsNotEmpty, IsOptional, MinLength } from "class-validator"
import { Status } from "../entities/blog.entity"

export class CreateBlogDto {
    @IsNotEmpty()
    @MinLength(3)
    title: string

    @IsNotEmpty()
    @MinLength(15)
    content: string

    @IsOptional()
    status: Status

    @IsOptional()
    genre_ids: []
}