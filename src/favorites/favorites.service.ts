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

  async findAll() {
    const [favorites] = await this.favoritesRepository.find();
    if (!favorites) {
      const newFavorites = this.favoritesRepository.create();
      newFavorites.tracks = [];
      newFavorites.albums = [];
      newFavorites.artists = [];
      return await this.favoritesRepository.save(newFavorites);
    }
    return favorites;
  }

  async updateFavorite(favorites: FavoritesEntity, el: string, elAdd: any) {
    const Index = favorites[el].findIndex((item) => item.id === elAdd.id);

    if (Index !== -1) {
      favorites[el].splice(Index, 1);
    } else {
      favorites[el].push(elAdd);
    }

    await this.favoritesRepository.save(favorites);
  }

  async addTrack(trackId: string) {
    const track = await this.tracksService.findOneId(trackId, true);
    const favorites = await this.findAll();
    await this.updateFavorite(favorites, 'tracks', track);
  }

  async addArtist(artistId: string) {
    const artist = await this.artistsService.findOneId(artistId, true);
    const favorites = await this.findAll();
    await this.updateFavorite(favorites, 'artists', artist);
  }

  async addAlbum(albumId: string) {
    const album = await this.albumsService.findOneId(albumId, true);
    const favorites = await this.findAll();
    await this.updateFavorite(favorites, 'albums', album);
  }

  async remove(favorites: FavoritesEntity, el: string, id: string) {
    const updatedFavorites = favorites[el].filter((item) => item.id !== id);

    if (updatedFavorites.length !== favorites[el].length) {
      favorites[el] = updatedFavorites;
      await this.favoritesRepository.save(favorites);
    } else {
      throw new NotFoundException('Not found');
    }
  }

  async removeTrack(trackId: string) {
    const favorites = await this.findAll();
    await this.remove(favorites, 'tracks', trackId);
  }

  async removeArtist(artistId: string) {
    const favorites = await this.findAll();
    await this.remove(favorites, 'artists', artistId);
  }

  async removeAlbum(albumId: string) {
    const favorites = await this.findAll();
    await this.remove(favorites, 'albums', albumId);
  }
}
