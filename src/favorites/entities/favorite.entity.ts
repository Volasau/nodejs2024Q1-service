import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Favorites {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}

@Entity('track-fav')
export class TrackFav {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  trackId: string | null;

  @ManyToOne(() => Track, { onDelete: 'SET NULL', eager: true })
  track: Track;
}

@Entity('artist-fav')
export class ArtistFav {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL', eager: true })
  artist: Artist;
}

@Entity('album-fav')
export class AlbumFav {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  albumId: string | null;

  @ManyToOne(() => Album, { onDelete: 'SET NULL', eager: true })
  album: Album;
}
