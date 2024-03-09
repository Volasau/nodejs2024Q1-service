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
}
