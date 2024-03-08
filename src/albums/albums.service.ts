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

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = data.albums.findIndex((albums) => albums.id === id);
    if (index === -1) throw new NotFoundException('Album not found');

    data.artists.splice(index, 1);
    return;
  }
}
