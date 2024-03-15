import { Artist } from '../../artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('album')
export class Album {
  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: Artist | null;

  @Column({ nullable: true })
  artistId: string | null;
}
