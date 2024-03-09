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

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = data.tracks.findIndex((tracks) => tracks.id === id);
    if (index === -1) throw new NotFoundException('Tracks not found');

    data.tracks.splice(index, 1);
    return;
  }
}
