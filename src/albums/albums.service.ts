import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistsService } from '../artists/artists.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistService: ArtistsService,
  ) {}

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOneId(id: string, isFavorites = false) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      if (isFavorites) {
        throw new UnprocessableEntityException('Incorrect data format');
      } else {
        throw new NotFoundException('Album not found');
      }
    }

    return album;
  }

  async create(CreateAlbumDto: CreateAlbumDto) {
    const artist = CreateAlbumDto.artistId
      ? await this.artistService.findOneId(CreateAlbumDto.artistId)
      : null;
    const newAlbum = this.albumRepository.create({
      name: CreateAlbumDto.name,
      year: CreateAlbumDto.year,
      artist,
    });

    return await this.albumRepository.save(newAlbum);
  }

  async update(id: string, UpdateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOneId(id);

    album.name = UpdateAlbumDto.name ? UpdateAlbumDto.name : album.name;
    album.year = UpdateAlbumDto.year ? UpdateAlbumDto.year : album.year;
    album.artist = UpdateAlbumDto.artistId
      ? await this.artistService.findOneId(UpdateAlbumDto.artistId)
      : null;

    return await this.albumRepository.save(album);
  }

  async removeAlbum(id: string) {
    const album = await this.findOneId(id);
    await this.albumRepository.remove(album);
  }
}
