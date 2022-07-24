import { Body, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guard/jwt.guard';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { UpdateGenreDto } from './dtos/update-genre.dto';
import { GenreService } from './genre.service';

@Controller('genre')
@UseGuards(JwtGuard)
export class GenreController {
    constructor(
        private genreServie: GenreService
    ) {}

    @Get('list')
    async getGenres() {
        return this.genreServie.getAllGenre()
    }

    @Post('add')
    async create(@Body() createGenreDto: CreateGenreDto) {
        return this.genreServie.addNewGenre(createGenreDto)
    }

    @Get('detail/:id')
    async getById(@Param('id') id: number) {
        return this.genreServie.getGenreDetail(id)
    }

    @Put('update/:id')
    async update(@Param('id') id: number, @Body() updateGenreDto: UpdateGenreDto) {
        return this.genreServie.updateGenre(id, updateGenreDto)
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number, @Req() req) {
        let role: string = req.user.role
        return role == 'admin' ? this.genreServie.deleteGenre(id) : new UnauthorizedException('Admin Only')
    }
}
