import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guard/jwt.guard';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { FilterBlogDto } from './dtos/filter-blog.dto';
import { UpdateBlogDto } from './dtos/update-blog.dto';

@Controller('blog')
@UseGuards(JwtGuard)
export class BlogController {
    constructor(
        private blogservice: BlogService
    ) {}

    @Get()
    async getNews(@Body() filterBlogDto: FilterBlogDto) {
        return this.blogservice.getBlogs(filterBlogDto)
    }

    @Post('add')
    async createNews(@Body() createBlogDto: CreateBlogDto) {
        return this.blogservice.createBlog(createBlogDto)
    }

    @Put('update/:id')
    async updateNews(
        @Param('id') id: number,
        @Body() updateBlogDto: UpdateBlogDto
    ) {
        return this.blogservice.updateBlog(id, updateBlogDto)
    }

    @Delete('delete/:id')
    async deleteNews(@Param('id') id: number) {
        return this.blogservice.deleteBlog(id)
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.blogservice.getById(id)
    }
}
