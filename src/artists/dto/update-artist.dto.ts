// import { PartialType } from '@nestjs/mapped-types';
// import { CreateArtistDto } from './create-artist.dto';

// export class UpdateArtistDto extends PartialType(CreateArtistDto) {}

export class UpdateArtistDto {
  name: string;
  grammy: boolean;
}
