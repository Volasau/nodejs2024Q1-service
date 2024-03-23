import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { migrations } from '../migration';
import { AlbumEntity } from '../albums/entities/album.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { FavoritesEntity } from '../favorites/entities/favorites.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { UserEntity } from '../users/entities/user.entity';

export const database: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PG_HOST as string,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER as string,
  password: process.env.PG_PASSWORD as string,
  database: process.env.PG_DB as string,
  entities: [
    AlbumEntity,
    ArtistEntity,
    FavoritesEntity,
    TrackEntity,
    UserEntity,
  ],
  migrations,
  logging: true,
  migrationsRun: true,
};
