import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { FavoritesEntity } from './entities/favorites.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity]),
    forwardRef(() => TracksModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, TracksService, ArtistsService, AlbumsService],
  exports: [TypeOrmModule],
})
export class FavoritesModule {}
