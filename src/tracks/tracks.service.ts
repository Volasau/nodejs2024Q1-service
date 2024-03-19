import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
// import { data } from 'src/data/data';
import { validate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';
import { TrackRepository } from './track-repository';
import { ArtistRepository } from 'src/artists/artist-repository';
import { AlbumRepository } from 'src/albums/album-repository';

@Injectable()
export class TracksService {
  constructor(
    private trackRepository: TrackRepository,
    private artistRepository: ArtistRepository,
    private albumRepository: AlbumRepository,
  ) {}

  async findAll(): Promise<Track[]> {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async findOne(id: string): Promise<Track> {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const track = await this.trackRepository.findOne({
      where: { id: id },
    });
    if (!track) {
      throw new NotFoundException('Not found track');
    }
    return track;
  }

  async create(createTrackDto: CreateTrackDto) {
    if (!(createTrackDto?.name && createTrackDto?.duration)) {
      throw new BadRequestException('You forgot to fill in name or duration');
    }

    if (typeof createTrackDto?.name !== 'string') {
      throw new BadRequestException('Name should be a string');
    }

    if (typeof createTrackDto?.duration !== 'number') {
      throw new BadRequestException('Duration should be a number');
    }

    const newTrackData = {
      id: uuidv4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      artistId: createTrackDto?.artistId,
      albumId: createTrackDto?.albumId,
    };

    const artist = await this.artistRepository.findOne({
      where: { id: createTrackDto.artistId },
    });

    const album = await this.albumRepository.findOne({
      where: { id: createTrackDto.albumId },
    });

    if (!artist || !album) {
      throw new BadRequestException('No such artist or album');
    }

    this.trackRepository.save(
      this.trackRepository.create({
        ...newTrackData,
      }),
    );
    return newTrackData;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const track = await this.trackRepository.findOne({
      where: { id: id },
    });
    if (!track) throw new NotFoundException('Not found track');

    if (
      !updateTrackDto.name &&
      !updateTrackDto.duration &&
      !updateTrackDto.artistId &&
      !updateTrackDto.albumId &&
      updateTrackDto.name &&
      typeof updateTrackDto.name !== 'string'
    ) {
      throw new BadRequestException('Name not string type');
    }

    if (
      updateTrackDto.duration &&
      typeof updateTrackDto.duration !== 'number'
    ) {
      throw new BadRequestException('Duration not number type');
    }

    if (
      updateTrackDto.artistId &&
      typeof updateTrackDto.artistId !== 'string'
    ) {
      throw new BadRequestException('ArtistId not string type');
    }

    if (updateTrackDto.albumId && typeof updateTrackDto.albumId !== 'string') {
      throw new BadRequestException('AlbumId not string type');
    }

    const newTrackData = {
      ...track,
      ...updateTrackDto,
    };

    this.trackRepository.save(newTrackData);
    return newTrackData;
  }

  async remove(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new NotFoundException('Tracks not found');

    // data.favorites.tracks = data.favorites.tracks.filter(
    //   (artist) => artist.id !== id,
    // );

    await this.trackRepository.delete(id);
    return;
  }
}
