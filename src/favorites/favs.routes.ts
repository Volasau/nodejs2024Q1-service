import { Routes } from '@nestjs/core';
import { FavsModule } from './favs/favs.module';
import { FavAlbumsModule } from './fav-albums/fav-albums.module';
import { FavArtistsModule } from './fav-artists/fav-artists.module';
import { FavTracksModule } from './fav-tracks/fav-tracks.module';

export const favsRoutes: Routes = [
  {
    path: 'favs',
    module: FavsModule,
    children: [
      {
        path: 'album',
        module: FavAlbumsModule,
      },
      {
        path: 'artist',
        module: FavArtistsModule,
      },
      {
        path: 'track',
        module: FavTracksModule,
      },
    ],
  },
];
