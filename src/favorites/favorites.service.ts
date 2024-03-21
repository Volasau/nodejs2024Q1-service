import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesEntity } from './entities/favorites.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
  ) {}

  async findAll(): Promise<FavoritesEntity> {
    const [favorites] = await this.favoritesRepository.find();
    if (!favorites) {
      const newFavorites: FavoritesEntity = this.favoritesRepository.create();
      newFavorites.tracks = [];
      newFavorites.albums = [];
      newFavorites.artists = [];
      return await this.favoritesRepository.save(newFavorites);
    }
    return favorites;
  }

  async modifyFavoriteList(
    favorites: FavoritesEntity,
    items: string,
    itemToAdd: any,
  ): Promise<void> {
    const itemIndex = favorites[items].findIndex(
      (item): boolean => item.id === itemToAdd.id,
    );

    if (itemIndex !== -1) {
      favorites[items].splice(itemIndex, 1);
    } else {
      favorites[items].push(itemToAdd);
    }

    await this.favoritesRepository.save(favorites);
  }

  async addTrack(trackId: string): Promise<void> {
    const track: TrackEntity = await this.tracksService.findOneId(
      trackId,
      true,
    );
    const favorites: FavoritesEntity = await this.findAll();
    await this.modifyFavoriteList(favorites, 'tracks', track);
  }

  async addArtist(artistId: string): Promise<void> {
    const artist: ArtistEntity = await this.artistsService.findOneId(
      artistId,
      true,
    );
    const favorites: FavoritesEntity = await this.findAll();
    await this.modifyFavoriteList(favorites, 'artists', artist);
  }

  async addAlbum(albumId: string): Promise<void> {
    const album: AlbumEntity = await this.albumsService.findOneId(
      albumId,
      true,
    );
    const favorites: FavoritesEntity = await this.findAll();
    await this.modifyFavoriteList(favorites, 'albums', album);
  }

  async deleteItemById(
    favorites: FavoritesEntity,
    items: string,
    id: string,
  ): Promise<void> {
    const itemIndex = favorites[items].findIndex(
      (item): boolean => item.id === id,
    );

    if (itemIndex !== -1) {
      favorites[items].splice(itemIndex, 1);
      await this.favoritesRepository.save(favorites);
    } else {
      throw new NotFoundException('Not found');
    }
  }

  async removeTrack(trackId: string): Promise<void> {
    const favorites: FavoritesEntity = await this.findAll();
    await this.deleteItemById(favorites, 'tracks', trackId);
  }

  async removeArtist(artistId: string): Promise<void> {
    const favorites: FavoritesEntity = await this.findAll();
    await this.deleteItemById(favorites, 'artists', artistId);
  }

  async removeAlbum(albumId: string): Promise<void> {
    const favorites: FavoritesEntity = await this.findAll();
    await this.deleteItemById(favorites, 'albums', albumId);
  }
}
