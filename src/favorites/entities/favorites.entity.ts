import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsUUID } from 'class-validator';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { TrackEntity } from '../../tracks/entities/track.entity';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @FavoritesOneToManyForAlbums()
  albums: AlbumEntity[];

  @FavoritesOneToManyForTracks()
  tracks: TrackEntity[];

  @FavoritesOneToManyForArtists()
  artists: ArtistEntity[];
}

function FavoritesOneToManyForAlbums() {
  return OneToMany(
    () => AlbumEntity,
    (album: AlbumEntity) => album.favorites,
    {
      onDelete: 'SET NULL',
      eager: true,
    },
  );
}

function FavoritesOneToManyForTracks() {
  return OneToMany(
    () => TrackEntity,
    (track: TrackEntity) => track.favorites,
    {
      onDelete: 'SET NULL',
      eager: true,
    },
  );
}

function FavoritesOneToManyForArtists() {
  return OneToMany(
    () => ArtistEntity,
    (artist: ArtistEntity) => artist.favorites,
    {
      onDelete: 'SET NULL',
      eager: true,
    },
  );
}
