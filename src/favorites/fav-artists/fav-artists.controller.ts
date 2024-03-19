import {
  Controller,
  Delete,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavArtistsService } from './fav-artists.service';

@Controller()
export class FavArtistsController {
  constructor(private favArtistsService: FavArtistsService) {}

  @Post(':id')
  async addToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    try {
      await this.favArtistsService.addToFavs(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException(error.message);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    try {
      await this.favArtistsService.deleteFromFavs(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
