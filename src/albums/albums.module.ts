import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsModule } from '../artists/artists.module';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumEntity } from './entities/album.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    forwardRef(() => ArtistsModule),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService, ArtistsService],
  exports: [TypeOrmModule],
})
export class AlbumsModule {}
