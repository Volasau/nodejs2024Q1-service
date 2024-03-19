import { Injectable } from '@nestjs/common';
import { FavoritesResponse } from './dto/favorites-response.dto';
import { AlbumRepository } from 'src/albums/album-repository';
import { ArtistRepository } from 'src/artists/artist-repository';
import { TrackRepository } from 'src/tracks/track-repository';

@Injectable()
export class FavsService {
  constructor(
    private albumRepository: AlbumRepository,
    private artistRepository: ArtistRepository,
    private trackRepository: TrackRepository,
  ) {}
  public async findAll(): Promise<FavoritesResponse> {
    return {
      artists: await this.artistRepository.getFavoriteArtists(),
      tracks: await this.trackRepository.getFavoriteTracks(),
      albums: await this.albumRepository.getFavoriteAlbums(),
    };
  }
}
