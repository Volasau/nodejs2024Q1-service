import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumRepository } from './album-repository';

@Module({
  imports: [forwardRef(() => ArtistsModule), TypeOrmModule.forFeature([Album])],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumRepository],
  exports: [AlbumRepository],
})
export class AlbumsModule {}
