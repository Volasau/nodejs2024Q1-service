import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteTrack } from './favorite-track.entity';
import { FavoriteAlbum } from './favorite-album.entity';
import { FavoriteArtist } from './favorite-artist.entity';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [
    TracksModule,
    AlbumsModule,
    ArtistsModule,
    TypeOrmModule.forFeature([FavoriteTrack, FavoriteAlbum, FavoriteArtist]),
  ],
})
export class FavsModule {}
