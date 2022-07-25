import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { UpdateGenreDto } from './dtos/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(Genre)
        private genreRepository: Repository<Genre>
    ) {}

    async getAllGenre() {
        try {
            let result = await this.genreRepository.find()
            return {
                status: 'success',
                data: result.length > 0 ? result : 'Belum ada genre'
            }
            
        } catch (error) {
            return {
                status: 'failed',
                message: error.message
            }
        }
    }

    async addNewGenre(createGenreDto: CreateGenreDto) {
        try {
            let genre = this.genreRepository.create(createGenreDto)
            await this.genreRepository.save(genre)
            return {
                status: 'success',
            }
        } catch (error) {
            return {
                status: 'failed',
                message: error.message
            }
        }
    }

    async updateGenre(id: number, updateGenreDto: UpdateGenreDto) {
        try {
            let { title, description } = updateGenreDto
            let genre = await this.genreRepository.findOne({where: {id}})
            if(!genre) throw new BadRequestException('Data tidak ditemukan')

            let update_data = new Genre()
            if(title) update_data.title = title
            if(description) update_data.description = description
            await this.genreRepository.update({id}, update_data)

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

    async deleteGenre(id: number) {
        try {
            let genre = await this.genreRepository.findOne({where: {id}})
            if(!genre) throw new BadRequestException('Data tidak ditemukan')
            await this.genreRepository.delete({ id })

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

    async getGenreDetail(id: number) {
        try {
            let query = this.genreRepository.createQueryBuilder('genre')
            query.leftJoinAndSelect('genre.blogs', 'blogs')
            query.andWhere('genre.id = :id', {id})

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
}
