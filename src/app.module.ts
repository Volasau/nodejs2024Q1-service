import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from './ormconfig';
import { FavsModule } from './favorites/favs/favs.module';
import { FavArtistsModule } from './favorites/fav-artists/fav-artists.module';
import { FavTracksModule } from './favorites/fav-tracks/fav-tracks.module';
import { FavAlbumsModule } from './favorites/fav-albums/fav-albums.module';
import { RouterModule } from '@nestjs/core';
import { favsRoutes } from './favorites/favs.routes';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavsModule,
    FavArtistsModule,
    FavTracksModule,
    FavAlbumsModule,
    RouterModule.register([...favsRoutes]),
    TypeOrmModule.forRoot(configService),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
