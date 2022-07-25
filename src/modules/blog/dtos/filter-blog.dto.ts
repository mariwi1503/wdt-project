import { IsNotEmpty, IsNumber, IsOptional } from "class-validator"
import { Status } from "../entities/blog.entity"

export class FilterBlogDto {
    @IsOptional()
    title: string

    @IsOptional()
    status: Status

    @IsOptional()
    genre_id: number

    @IsOptional()
    limit: number

    @IsNotEmpty()
    @IsNumber()
    page: number
}