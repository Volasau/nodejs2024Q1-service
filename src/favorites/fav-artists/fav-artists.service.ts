import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteArtist } from '../favs/favorite-artist.entity';
import { ArtistRepository } from 'src/artists/artist-repository';

@Injectable()
export class FavArtistsService {
  constructor(
    @InjectRepository(FavoriteArtist)
    private favArtistRepository: Repository<FavoriteArtist>,
    private artistRepository: ArtistRepository,
  ) {}
  public async addToFavs(id: string): Promise<void> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundException('Artist', id);
    await this.favArtistRepository.save(new FavoriteArtist(artist));
  }

  public async deleteFromFavs(id: string): Promise<void> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundException('Artist', id);
    await this.favArtistRepository.delete({ artist: { id } });
  }
}
