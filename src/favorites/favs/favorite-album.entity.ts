import { Album } from 'src/albums/entities/album.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteAlbum {
  constructor(album: Album) {
    this.album = album;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Album, null, { onDelete: 'CASCADE', eager: true })
  album: Album;
}
