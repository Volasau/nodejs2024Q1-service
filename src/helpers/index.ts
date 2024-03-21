import { AlbumEntity } from '../albums/entities/album.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { FavoritesEntity } from '../favorites/entities/favorites.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { UserEntity } from '../users/entities/user.entity';

export * from '../albums/entities/album.entity';
export * from '../artists/entities/artist.entity';
export * from '../favorites/entities/favorites.entity';
export * from '../tracks/entities/track.entity';
export * from '../users/entities/user.entity';

export const entities = [
  AlbumEntity,
  ArtistEntity,
  FavoritesEntity,
  TrackEntity,
  UserEntity,
];
