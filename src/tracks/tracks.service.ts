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
    const artist = data.tracks.find((track) => track.id === id);
    if (!artist) {
      throw new NotFoundException('Not found artist');
    }
    return artist;
  }
  create(createTrackDto: CreateTrackDto) {
    return 'This action adds a new track';
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
