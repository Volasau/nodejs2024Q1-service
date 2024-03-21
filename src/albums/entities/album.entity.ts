import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsString, IsUUID, IsInt } from 'class-validator';
import { FavoritesEntity } from '../../favorites/entities/favorites.entity';
import { ArtistEntity } from '../../artists/entities/artist.entity';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsInt()
  year: number;

  @Column({
    default: null,
    nullable: true,
  })
  @IsUUID()
  artistId: string | null;

  @Exclude()
  @ManyToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: ArtistEntity;

  @Exclude()
  @ManyToOne(
    () => FavoritesEntity,
    (favorites: FavoritesEntity) => favorites.albums,
    {
      onDelete: 'SET NULL',
    },
  )
  favorites: FavoritesEntity;
}
