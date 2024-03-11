import { IAlbum } from 'src/albums/interfaces/album.interface';
import { IArtist } from 'src/artists/interfaces/artist.interface';
import { ITrack } from 'src/tracks/interfaces/track.interface';

export interface IIFavorites {
  artists: IArtist[]; // favorite artists ids
  albums: IAlbum[]; // favorite albums ids
  tracks: ITrack[]; // favorite tracks ids
}
