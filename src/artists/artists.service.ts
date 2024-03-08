import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { data } from 'src/data/data';
import { validate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  findAll() {
    return data.artists;
  }

  findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const artist = data.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Not found artist');
    }
    return artist;
  }

  create(createArtistDto: CreateArtistDto) {
    if (!createArtistDto.name || !createArtistDto.grammy) {
      throw new BadRequestException(
        'You forgot to fill in your name or grammy',
      );
    }
    const artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    data.artists.push(artist);
    return artist;
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = data.artists.findIndex((artist) => artist.id === id);
    if (index === -1) throw new NotFoundException('Artists not found');

    data.artists.splice(index, 1);
    return;
  }
}
