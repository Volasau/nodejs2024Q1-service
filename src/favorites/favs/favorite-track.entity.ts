import { Track } from 'src/tracks/entities/track.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteTrack {
  constructor(track: Track) {
    this.track = track;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Track, null, { onDelete: 'CASCADE', eager: true })
  track: Track;
}
