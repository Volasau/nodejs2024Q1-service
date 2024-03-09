import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { data } from 'src/data/data';
import { validate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  findAll() {
    return data.albums;
  }

  findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const album = data.albums.find((album) => album.id === id);
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
      artistId: null,
    };
    data.albums.push(newAlbumData);
    return newAlbumData;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = data.albums.findIndex((artist) => artist.id === id);
    if (index === -1) throw new NotFoundException('Not found albums');

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
      ...data.albums[index],
      ...updateAlbumDto,
    };

    data.albums[index] = updatedAlbum;
    return updatedAlbum;
  }

  remove(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = data.albums.findIndex((albums) => albums.id === id);
    if (index === -1) throw new NotFoundException('Album not found');

    data.tracks.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });

    data.favorites.albums = data.albums.filter((album) => album.id !== id);

    data.albums.splice(index, 1);
    return;
  }
}
