import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity, ArtistEntity } from '../helpers';
import { ArtistsService } from '../artists/artists.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistService: ArtistsService,
  ) {}

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async findOneId(id: string, isFavorites = false): Promise<AlbumEntity> {
    const album: AlbumEntity = await this.albumRepository.findOneBy({ id });

    if (!album) {
      const Exception = isFavorites
        ? UnprocessableEntityException
        : NotFoundException;

      throw new Exception('Incorrect data format');
    }

    return album;
  }

  async create({ name, year, artistId }: CreateAlbumDto): Promise<AlbumEntity> {
    const artist: ArtistEntity = artistId
      ? await this.artistService.findOneId(artistId)
      : null;
    const newAlbum: AlbumEntity = this.albumRepository.create({
      name,
      year,
      artist,
    });

    return await this.albumRepository.save(newAlbum);
  }

  async update(
    id: string,
    { name, year, artistId }: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album: AlbumEntity = await this.findOneId(id);

    if (name) {
      album.name = name;
    }

    if (year) {
      album.year = year;
    }

    if (artistId) {
      album.artist = artistId
        ? await this.artistService.findOneId(artistId)
        : null;
    }

    return await this.albumRepository.save(album);
  }

  async removeAlbum(id: string): Promise<void> {
    const album: AlbumEntity = await this.findOneId(id);
    await this.albumRepository.remove(album);
  }
}
