import { IsOptional } from "class-validator"
import { Status } from "../entities/blog.entity"

export class UpdateBlogDto {
    @IsOptional()
    title: string

    @IsOptional()
    content: string

    @IsOptional()
    status: Status
}