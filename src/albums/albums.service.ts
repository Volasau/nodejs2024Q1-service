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

@Injectable()
export class AlbumsService {
  @InjectRepository(Album)
  private albumRepository: Repository<Album>;
  @InjectRepository(Artist)
  private artistRepository: Repository<Artist>;

  async findAll(): Promise<Album[]> {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async findOne(id: string): Promise<Album> {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException('Not found artist');
    }
    return album;
  }

  create(createAlbumDto: CreateAlbumDto) {
    if (
      !createAlbumDto.name ||
      !createAlbumDto.year ||
      typeof createAlbumDto.name !== 'string' ||
      typeof createAlbumDto.year !== 'number'
    ) {
      throw new BadRequestException('Name or year invalid type');
    }

    const newAlbumData = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId || null,
    };
    this.albumRepository.save(
      this.albumRepository.create({
        ...newAlbumData,
      }),
    );
    return newAlbumData;
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
    };

    return await this.albumRepository.save(updatedAlbum);
  }

  async remove(id: string): Promise<void> {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundException('Album not found');

    // data.tracks.forEach((track) => {
    //   if (track.albumId === id) track.albumId = null;
    // });

    // data.favorites.albums = data.albums.filter((album) => album.id !== id);

    await this.albumRepository.delete(id);

    return;
  }
}
