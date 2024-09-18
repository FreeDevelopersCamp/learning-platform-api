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
import { RoadmapService } from '../../services/roadmap/roadmap.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateRoadmapDto } from '../../dto/roadmap/create.roadmap';
import { UpdateRoadmapDto } from '../../dto/roadmap/update.roadmap';
import { ResourceRoadmapDto } from '../../dto/roadmap/resource.roadmap';

@ApiBearerAuth('authorization')
@ApiTags('roadmap')
@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly _roadmapService: RoadmapService) {}

  @Get()
  @ApiResponse({
    description: 'List of roadmap',
    isArray: true,
    type: ResourceRoadmapDto,
  })
  list() {
    return this._roadmapService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'roadmap information',
    isArray: false,
    type: ResourceRoadmapDto,
  })
  getById(@Param('id') id: string) {
    return this._roadmapService.getById(id);
  }

  @Post()
  @ApiResponse({
    description: 'roadmap created information',
    isArray: false,
    type: ResourceRoadmapDto,
  })
  create(@Body() roadmap: CreateRoadmapDto) {
    return this._roadmapService.create(roadmap);
  }

  @Patch()
  @ApiResponse({
    description: 'roadmap updated information',
    isArray: false,
    type: ResourceRoadmapDto,
  })
  update(@Body() roadmap: UpdateRoadmapDto) {
    return this._roadmapService.update(roadmap);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceRoadmapDto,
  })
  delete(@Param('id') id: string) {
    return this._roadmapService.delete(id);
  }
}
