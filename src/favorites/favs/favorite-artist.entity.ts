import { Artist } from 'src/artists/entities/artist.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteArtist {
  constructor(artist: Artist) {
    this.artist = artist;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Artist, null, { onDelete: 'CASCADE' })
  artist: Artist;
}
