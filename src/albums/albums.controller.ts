import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async findAll(): Promise<AlbumEntity[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOneId(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<AlbumEntity> {
    return this.albumsService.findOneId(id);
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.albumsService.removeAlbum(id);
  }
}
