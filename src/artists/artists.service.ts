import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOneId(id: string, isFavorites = false) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      if (isFavorites) {
        throw new UnprocessableEntityException('Incorrect data format');
      } else {
        throw new NotFoundException('Not found ');
      }
    }

    return artist;
  }

  async createArtist(artist: CreateArtistDto) {
    const newArtist = this.artistRepository.create(artist);

    return await this.artistRepository.save(newArtist);
  }

  async updateArtist(id: string, UpdateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException('Not found artist');
    }

    artist.name = UpdateArtistDto.name ? UpdateArtistDto.name : artist.name;
    artist.grammy =
      UpdateArtistDto.grammy !== undefined
        ? UpdateArtistDto.grammy
        : artist.grammy;

    return await this.artistRepository.save(artist);
  }

  async removeArtist(id: string) {
    const artist = await this.findOneId(id);
    await this.artistRepository.remove(artist);
  }
}
