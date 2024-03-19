import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
// import { data } from 'src/data/data';
import { validate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
import { AlbumRepository } from './album-repository';
import { ArtistRepository } from 'src/artists/artist-repository';

@Injectable()
export class AlbumsService {
  constructor(
    private albumRepository: AlbumRepository,
    private artistRepository: ArtistRepository,
  ) {}

  public async findAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  public async findOne(id: string): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundException('Album', id);
    return album;
  }

  public async create(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;
    const artist = artistId
      ? await this.artistRepository.findOne({
          where: { id: artistId },
        })
      : null;
    const albumToCreate = new Album({ name, year, artist });
    return await this.albumRepository.save(albumToCreate);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundException('Not found albums');

    if (!updateAlbumDto?.name && !updateAlbumDto?.year)
      throw new BadRequestException('You forgot to fill in name or year');

    if (updateAlbumDto.name && typeof updateAlbumDto.name !== 'string') {
      throw new BadRequestException('Name should be a string');
    }

    if (updateAlbumDto.year && typeof updateAlbumDto.year !== 'number') {
      throw new BadRequestException('Year should be a number');
    }
    if (
      updateAlbumDto.artistId &&
      typeof updateAlbumDto.artistId !== 'string'
    ) {
      throw new BadRequestException('ArtistId should be a string');
    }

    const updatedAlbum = {
      ...album,
      ...updateAlbumDto,
    } as Album;

    return await this.albumRepository.save(updatedAlbum);
  }

  async remove(id: string): Promise<void> {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundException('Album not found');

    await this.albumRepository.delete(id);

    return;
  }
}
