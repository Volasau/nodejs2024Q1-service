import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../helpers';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async findOneId(id: string, isFavorites = false): Promise<ArtistEntity> {
    const artist: ArtistEntity = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      const Exception = isFavorites
        ? UnprocessableEntityException
        : NotFoundException;

      throw new Exception('Incorrect data format');
    }

    return artist;
  }

  async createArtist(artist: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist: ArtistEntity = this.artistRepository.create(artist);

    return await this.artistRepository.save(newArtist);
  }

  async updateArtist(
    id: string,
    { name, grammy }: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist: ArtistEntity = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException('Not found artist');
    }

    if (name) {
      artist.name = name;
    }

    if (grammy !== undefined) {
      artist.grammy = grammy;
    }

    return await this.artistRepository.save(artist);
  }

  async removeArtist(id: string): Promise<void> {
    const artist: ArtistEntity = await this.findOneId(id);
    await this.artistRepository.remove(artist);
  }
}
