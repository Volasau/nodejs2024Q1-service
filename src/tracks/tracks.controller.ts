import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksService } from './tracks.service';
import { TrackEntity } from './entities/track.entity';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async findAll(): Promise<TrackEntity[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findOneId(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<TrackEntity> {
    return this.tracksService.findOneId(id);
  }

  @Post()
  async createTrack(
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<TrackEntity> {
    return this.tracksService.createTrack(createTrackDto);
  }

  @Put(':id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    return this.tracksService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.tracksService.removeTrack(id);
  }
}
