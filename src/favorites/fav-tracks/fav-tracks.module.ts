import { forwardRef, Module } from '@nestjs/common';
import { FavTracksController } from './fav-tracks.controller';
import { FavTracksService } from './fav-tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteTrack } from '../favs/favorite-track.entity';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  controllers: [FavTracksController],
  providers: [FavTracksService],
  imports: [
    forwardRef(() => TracksModule),
    TypeOrmModule.forFeature([FavoriteTrack]),
  ],
})
export class FavTracksModule {}
