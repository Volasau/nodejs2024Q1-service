import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteTrack } from '../favs/favorite-track.entity';
import { Repository } from 'typeorm';
import { TrackRepository } from 'src/tracks/track-repository';

@Injectable()
export class FavTracksService {
  constructor(
    @InjectRepository(FavoriteTrack)
    private favTrackRepository: Repository<FavoriteTrack>,
    private trackRepository: TrackRepository,
  ) {}
  public async addToFavs(id: string): Promise<void> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new NotFoundException('Track', id);
    await this.favTrackRepository.save(new FavoriteTrack(track));
  }

  public async deleteFromFavs(id: string): Promise<void> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new NotFoundException('Track', id);
    await this.favTrackRepository.delete({ track: { id } });
  }
}
