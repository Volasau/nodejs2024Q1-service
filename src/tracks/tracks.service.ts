import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from '../helpers';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

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

  async findAll(): Promise<TrackEntity[]> {
    return await this.trackRepository.find();
  }

  async findOneId(id: string, isFavorites = false): Promise<TrackEntity> {
    const track: TrackEntity = await this.trackRepository.findOneBy({ id });

    if (!track) {
      const Exception = isFavorites
        ? UnprocessableEntityException
        : NotFoundException;

      throw new Exception('Incorrect data format');
    }

    return track;
  }

  async createTrack({
    name,
    duration,
    artistId,
    albumId,
  }: CreateTrackDto): Promise<TrackEntity> {
    const [artist, album] = await Promise.all([
      artistId ? this.artistService.findOneId(artistId) : Promise.resolve(null),
      albumId ? this.albumService.findOneId(albumId) : Promise.resolve(null),
    ]);

    const newTrack: TrackEntity = this.trackRepository.create({
      name,
      duration,
      artist,
      album,
    });

    return await this.trackRepository.save(newTrack);
  }

  async updateTrack(
    id: string,
    { name, duration, artistId, albumId }: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const track: TrackEntity = await this.findOneId(id);

    track.name = name ?? track.name;
    track.duration = duration ?? track.duration;

    if (artistId) {
      track.artist = await this.artistService.findOneId(artistId);
    }

    if (albumId) {
      track.album = await this.albumService.findOneId(albumId);
    }

    return await this.trackRepository.save(track);
  }

  async removeTrack(id: string): Promise<void> {
    const track: TrackEntity = await this.findOneId(id);
    await this.trackRepository.remove(track);
  }
}
