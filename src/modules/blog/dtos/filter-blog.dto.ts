import { IsOptional } from "class-validator"
import { Status } from "../entities/blog.entity"

export class FilterBlogDto {
    @IsOptional()
    title: string

    @IsOptional()
    status: Status
}