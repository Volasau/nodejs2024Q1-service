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
import { ArtistEntity } from '../helpers';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async findAll(): Promise<ArtistEntity[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findOneId(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ArtistEntity> {
    return this.artistsService.findOneId(id);
  }

  @Post()
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistsService.createArtist(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistsService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.artistsService.removeArtist(id);
  }
}
