import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
// import { data } from 'src/data/data';
import { validate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  @InjectRepository(Artist)
  private artistRepository: Repository<Artist>;

  async findAll(): Promise<Artist[]> {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async findOne(id: string): Promise<Artist> {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const artist = await this.artistRepository.findOne({
      where: { id: id },
    });
    if (!artist) {
      throw new NotFoundException('Not found artist');
    }
    return artist;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
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

    await this.artistRepository.save(artist);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');

    const artist = await this.artistRepository.findOne({
      where: { id: id },
    });
    if (!artist) throw new NotFoundException('Not found artist');

    if (
      (updateArtistDto.name && typeof updateArtistDto.name !== 'string') ||
      (updateArtistDto.grammy && typeof updateArtistDto.grammy !== 'boolean')
    )
      throw new BadRequestException('Name or grammy invalid type');

    const newArtistData = {
      ...artist,
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    };

    this.artistRepository.save(newArtistData);
    return newArtistData;
  }

  async remove(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundException('Artists not found');

    // data.albums.forEach((album) => {
    //   if (album.artistId === id) album.artistId = null;
    // });

    // data.tracks.forEach((track) => {
    //   if (track.artistId === id) track.artistId = null;
    // });

    // data.favorites.artists = data.favorites.artists.filter(
    //   (artist) => artist.id !== id,
    // );

    await this.artistRepository.delete(id);
    return;
  }
}
