import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistService: ArtistsService,
  ) {}

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOneId(id: string, isFavorites = false) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      if (isFavorites) {
        throw new UnprocessableEntityException('Incorrect data format');
      } else {
        throw new NotFoundException('Track not found');
      }
    }

    return track;
  }

  async createTrack(CreateTrackDto: CreateTrackDto) {
    let artist = null;
    let album = null;

    if (CreateTrackDto.artistId) {
      artist = await this.artistService.findOneId(CreateTrackDto.artistId);
    }

    if (CreateTrackDto.albumId) {
      album = await this.albumService.findOneId(CreateTrackDto.albumId);
    }

    const newTrack = this.trackRepository.create({
      name: CreateTrackDto.name,
      duration: CreateTrackDto.duration,
      artist,
      album,
    });

    return await this.trackRepository.save(newTrack);
  }

  async updateTrack(id: string, UpdateTrackDto: UpdateTrackDto) {
    const track = await this.findOneId(id);

    track.name = UpdateTrackDto.name ?? track.name;
    track.duration = UpdateTrackDto.duration ?? track.duration;

    track.artist = UpdateTrackDto.artistId
      ? await this.artistService.findOneId(UpdateTrackDto.artistId)
      : track.artist;
    track.album = UpdateTrackDto.albumId
      ? await this.albumService.findOneId(UpdateTrackDto.albumId)
      : track.album;

    return await this.trackRepository.save(track);
  }

  async removeTrack(id: string) {
    const track = await this.findOneId(id);
    await this.trackRepository.remove(track);
  }
}
