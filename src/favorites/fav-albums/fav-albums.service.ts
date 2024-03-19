import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteAlbum } from '../favs/favorite-album.entity';
import { AlbumRepository } from 'src/albums/album-repository';

@Injectable()
export class FavAlbumsService {
  constructor(
    @InjectRepository(FavoriteAlbum)
    private favAlbumRepository: Repository<FavoriteAlbum>,
    private albumRepository: AlbumRepository,
  ) {}
  public async addToFavs(id: string): Promise<void> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundException('Album', id);
    await this.favAlbumRepository.save(new FavoriteAlbum(album));
  }

  public async deleteFromFavs(id: string): Promise<void> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundException('Album', id);
    await this.favAlbumRepository.delete({ album: { id } });
  }
}
