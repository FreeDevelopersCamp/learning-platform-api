import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { TrackService } from '../../services/track/track.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
import { CreateTrackDto } from '../../dto/track/create.track';
import { UpdateTrackDto } from '../../dto/track/update.track';
import { ResourceTrackDto } from '../../dto/track/resource.track';

@ApiBearerAuth('authorization')
@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly _trackService: TrackService) {}

  @Get()
  @ApiResponse({
    description: 'List of track',
    isArray: true,
    type: ResourceTrackDto,
  })
  list() {
    return this._trackService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'track information',
    isArray: false,
    type: ResourceTrackDto,
  })
  getById(@Param('id') id: string) {
    return this._trackService.getById(id);
  }

  @Post()
  @UsePipes(new SchemaValidation())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'track created information',
    isArray: false,
    type: ResourceTrackDto,
  })
  create(@Body() track: CreateTrackDto) {
    return this._trackService.create(track);
  }

  @Patch()
  @UsePipes(new ObjectIdValidationPipe(), new SchemaValidation())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'track updated information',
    isArray: false,
    type: ResourceTrackDto,
  })
  update(@Body() track: UpdateTrackDto) {
    return this._trackService.update(track);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceTrackDto,
  })
  delete(@Param('id') id: string) {
    return this._trackService.delete(id);
  }
}
