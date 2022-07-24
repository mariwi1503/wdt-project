import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { FilterBlogDto } from './dtos/filter-blog.dto';
import { UpdateBlogDto } from './dtos/update-blog.dto';
import { Blog, Status } from './entities/blog.entity';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private blogRepository: Repository<Blog>,
        private dataSource: DataSource
    ) {}

    async getBlogs(filterBlogDto: FilterBlogDto) {
        try {
            // let { status, topic_id } = filterNewsDto
            // let query = this.newsRepository.createQueryBuilder('news')
            // query.leftJoinAndSelect('news.topics', 'topics')

            // if(status) {
            //     query.andWhere('news.status = :status', {status: status.toLocaleLowerCase()})
            // }

            // if(topic_id) {
            //     query.andWhere('topics.id = :id', {id: topic_id})
            // }

            // let result = await query.getMany()
            // if(result.length < 1) throw new BadRequestException('Data tidak ditemukan')
            // return {
            //     status: 'success',
            //     data: result
            // }

            let blogs = await this.blogRepository.find()
            return {
                status: 'success',
                data: blogs
            }
        } catch (error) {
            return {
                status: 'failed',
                message: error.message
            }
        }
    }

    async getById(id: number) {
        try {
            let query = this.blogRepository.createQueryBuilder('blog')
            query.andWhere('blog.id = :id', {id})

            let result = await query.getOne()
            if(!result) throw new BadRequestException('Data tidak ditemukan')
            return {
                status: 'success',
                data: result
            }
        } catch (error) {
            return {
                status: 'failed',
                message: error.message
            }
        }
    }

    async createBlog(createBlogDto: CreateBlogDto) {
        try {
            let { title, content, status = Status.draft } = createBlogDto
            // let genres = []
            // // if(genre_ids && genre_ids.length > 0) {
            // //     genre_ids.map((x) => {
            // //         genres.push({id: x})
            // //     })
            // // }
            let blog = new Blog()
            blog.title = title
            blog.content = content
            blog.status = status
            // blog.genres = genres

            await this.dataSource.manager.save(blog)
            return {
                status: 'success'
            }
        } catch (error) {
            return {
                status: 'failed',
                message: error.message
            }
        }
    }

    async updateBlog(id: number, updateBlogDto: UpdateBlogDto) {
        try {
            let { title, content, status } = updateBlogDto
            let blog = await this.blogRepository.findOne({where: {id}})
            if(!blog) throw new BadRequestException('Data tidak ditemukan')

            let new_data = new Blog()
            if(title) new_data.title = title
            if(content) new_data.content = content
            if(status) new_data.status = status
            await this.blogRepository.update({id}, new_data)

            return {
                status: 'success',
                id
            }
        } catch (error) {
            return {
                status: 'failed',
                message: error.message
            }
        }
    }

    async deleteBlog(id: number) {
        try {
            let blog = await this.blogRepository.findOne({where: {id}})
            if(!blog) throw new BadRequestException('Data tidak ditemukan')

            await this.blogRepository.delete({id})
            return {
                status: 'success',
                id
            }
        } catch (error) {
            return {
                status: 'failed',
                message: error.message
            }
        }
    }
}
