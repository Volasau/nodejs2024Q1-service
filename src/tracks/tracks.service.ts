import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { data } from 'src/data/data';
import { validate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracksService {
  findAll() {
    return data.tracks;
  }

  findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const track = data.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Not found track');
    }
    return track;
  }

  create(createTrackDto: CreateTrackDto) {
    if (!(createTrackDto?.name && createTrackDto?.duration)) {
      throw new BadRequestException('You forgot to fill in name or duration');
    }

    if (typeof createTrackDto?.name !== 'string') {
      throw new BadRequestException('Name should be a string');
    }

    if (typeof createTrackDto?.duration !== 'number') {
      throw new BadRequestException('Duration should be a number');
    }

    const newTrackData = {
      id: uuidv4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      artistId: createTrackDto?.artistId,
      albumId: createTrackDto?.albumId,
    };

    data.tracks.push(newTrackData);
    return newTrackData;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = data.tracks.findIndex((track) => track.id === id);
    if (index === -1) throw new NotFoundException('Not found track');

    if (
      !updateTrackDto.name &&
      !updateTrackDto.duration &&
      !updateTrackDto.artistId &&
      !updateTrackDto.albumId &&
      updateTrackDto.name &&
      typeof updateTrackDto.name !== 'string'
    ) {
      throw new BadRequestException('Name not string type');
    }

    if (
      updateTrackDto.duration &&
      typeof updateTrackDto.duration !== 'number'
    ) {
      throw new BadRequestException('Duration not number type');
    }

    if (
      updateTrackDto.artistId &&
      typeof updateTrackDto.artistId !== 'string'
    ) {
      throw new BadRequestException('ArtistId not string type');
    }

    if (updateTrackDto.albumId && typeof updateTrackDto.albumId !== 'string') {
      throw new BadRequestException('AlbumId not string type');
    }

    const track = data.tracks.find((track) => track.id === id);
    const newTrackData = {
      ...track,
      ...updateTrackDto,
    };

    data.tracks[index] = newTrackData;
    return newTrackData;
  }

  remove(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = data.tracks.findIndex((track) => track.id === id);
    if (index === -1) throw new NotFoundException('Tracks not found');

    data.favorites.tracks = data.favorites.tracks.filter(
      (artist) => artist.id !== id,
    );

    data.tracks.splice(index, 1);
    return;
  }
}
