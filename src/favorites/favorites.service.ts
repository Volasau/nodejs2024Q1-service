import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { data } from 'src/data/data';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { AlbumFav, ArtistFav, TrackFav } from './entities/favorite.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(ArtistFav)
    private artistFavRepository: Repository<ArtistFav>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,

    @InjectRepository(TrackFav)
    private trackFavRepository: Repository<TrackFav>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,

    @InjectRepository(AlbumFav)
    private albumFavRepository: Repository<AlbumFav>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async findAll() {
    const artistFavs = await this.artistFavRepository.find({
      relations: { artist: true },
    });
    const albumFavs = await this.albumFavRepository.find({
      relations: { album: true },
    });
    const trackFavs = await this.trackFavRepository.find({
      relations: { track: true },
    });

    const artists = artistFavs.map((artistFav) => artistFav.artist);
    const albums = albumFavs.map((albumFav) => albumFav.album);
    const tracks = trackFavs.map((trackFav) => trackFav.track);

    return { artists, albums, tracks };
  }

  async addAlbumToFavorites(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new UnprocessableEntityException('Album does not exist');

    this.albumFavRepository.save(album);
    return album;
  }

  async removeAlbum(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundException('Album not found');

    await this.albumFavRepository.delete({ album: { id } });
    return;
  }

  async addArtistToFavorites(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist)
      throw new UnprocessableEntityException('Artist does not exist');

    this.artistFavRepository.save(artist);
    return artist;
  }

  async removeArtist(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundException('Artist not found');

    await this.artistFavRepository.delete({ artist: { id } });
    return;
  }

  async addTrackToFavorite(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new UnprocessableEntityException('Track does not exist');

    this.trackFavRepository.save(track);
    return track;
  }

  async removeTrack(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new NotFoundException('Track not found');

    await this.trackFavRepository.delete({ track: { id } });
    return;
  }
}
