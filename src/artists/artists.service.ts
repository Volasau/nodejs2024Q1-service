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

    if (
      typeof createArtistDto.name !== 'string' ||
      typeof createArtistDto.grammy !== 'boolean'
    ) {
      throw new BadRequestException('Name or grammy invalid type');
    }

    const artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    data.artists.push(artist);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');

    const index = data.artists.findIndex((artist) => artist.id === id);
    if (index === -1) throw new NotFoundException('Not found artist');

    if (
      (updateArtistDto.name && typeof updateArtistDto.name !== 'string') ||
      (updateArtistDto.grammy && typeof updateArtistDto.grammy !== 'boolean')
    )
      throw new BadRequestException('Name or grammy invalid type');
    const artist = data.artists.find((artist) => artist.id === id);

    const newArtistData = {
      ...artist,
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    };

    data.artists[index] = newArtistData;
    return newArtistData;
  }

  remove(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = data.artists.findIndex((artist) => artist.id === id);
    if (index === -1) throw new NotFoundException('Artists not found');

    data.albums.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });

    data.tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });

    data.artists.splice(index, 1);
    return;
  }
}
