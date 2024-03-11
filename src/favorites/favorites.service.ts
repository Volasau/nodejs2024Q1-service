import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { data } from 'src/data/data';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  findAll() {
    return data.favorites;
  }

  addAlbumToFavorites(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = data.albums.findIndex((album) => album.id === id);
    if (index === -1)
      throw new UnprocessableEntityException('Album does not exist');
    const album = data.albums.find((album) => album.id === id);

    data.favorites.albums.push(album);
    return album;
  }

  removeAlbum(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = data.favorites.albums.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException('Album not found');

    data.favorites.albums.splice(index, 1);
    return;
  }

  addArtistToFavorites(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = data.artists.findIndex((artist) => artist.id === id);
    if (index === -1)
      throw new UnprocessableEntityException('Artist does not exist');
    const artist = data.artists[index];

    data.favorites.artists.push(artist);
    return artist;
  }

  removeArtist(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = data.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (index === -1) throw new NotFoundException('Artist not found');

    data.favorites.artists.splice(index, 1);
    return;
  }

  addTrackToFavorite(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = data.tracks.findIndex((track) => track.id === id);
    if (index === -1)
      throw new UnprocessableEntityException('Track does not exist');
    const track = data.tracks[index];

    data.favorites.tracks.push(track);
    return track;
  }

  removeTrack(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = data.favorites.tracks.findIndex((track) => track.id === id);
    if (index === -1) throw new NotFoundException('Track not found');

    data.favorites.tracks.splice(index, 1);
    return;
  }
}
