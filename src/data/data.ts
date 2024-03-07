import { IAlbum } from 'src/albums/interfaces/album.interface';
import { IArtist } from 'src/artists/interfaces/artist.interface';
import { IFavorites } from 'src/favorites/interfaces/favorites.interface';
import { ITrack } from 'src/tracks/interfaces/track.interface';
import { IUser } from 'src/users/interfaces/user.interface';

export const data: IData = {
  users: [],
  artists: [],
  albums: [],
  tracks: [],
  favorites: {
    albums: [],
    artists: [],
    tracks: [],
  },
};

interface IData {
  users: IUser[];
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
  favorites: IFavorites;
}
