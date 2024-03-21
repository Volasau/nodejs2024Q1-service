import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from '../albums/albums.module';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsModule } from '../artists/artists.module';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TrackEntity } from './entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
  ],
  controllers: [TracksController],
  providers: [TracksService, AlbumsService, ArtistsService],
  exports: [TypeOrmModule],
})
export class TracksModule {}
