import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistRepository extends Repository<Artist> {
  constructor(private dataSource: DataSource) {
    super(Artist, dataSource.createEntityManager());
  }

  async getFavoriteArtists(): Promise<Artist[]> {
    return this.createQueryBuilder('artist')
      .select('artist')
      .innerJoin(
        'favorite_artist',
        'favorites',
        'favorites.artistId = artist.id',
      )
      .getMany();
  }
}
