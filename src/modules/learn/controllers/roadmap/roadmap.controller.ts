import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { RoadmapService } from '../../services/roadmap/roadmap.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CreateRoadmapDto } from '../../dto/roadmap/create.roadmap';
import { UpdateRoadmapDto } from '../../dto/roadmap/update.roadmap';
import { ResourceRoadmapDto } from '../../dto/roadmap/resource.roadmap';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';

@ApiBearerAuth('authorization')
@ApiTags('roadmap')
@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly _roadmapService: RoadmapService) {}

  @Get()
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.accountManager,
    AllowRoles.contentManager,
    AllowRoles.instructor,
    AllowRoles.learner,
  ])
  @UseInterceptors(PaginationInterceptor)
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page',
    type: Number,
  })
  @ApiResponse({
    description: 'List of roadmap',
    isArray: true,
    type: ResourceRoadmapDto,
  })
  list() {
    return this._roadmapService.list();
  }

  @Get('/roadmapByInstructor/:id')
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.accountManager,
    AllowRoles.contentManager,
    AllowRoles.instructor,
    AllowRoles.learner,
  ])
  @UseInterceptors(PaginationInterceptor)
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page',
    type: Number,
  })
  @ApiResponse({
    description: 'List of course',
    isArray: true,
    type: ResourceRoadmapDto,
  })
  listByInstructor(@Param('id') id: string) {
    return this._roadmapService.listByInstructor(id);
  }

  @Get('/:id')
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.accountManager,
    AllowRoles.contentManager,
    AllowRoles.instructor,
    AllowRoles.learner,
  ])
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
  @Roles([AllowRoles.admin, AllowRoles.contentManager, AllowRoles.instructor])
  @ApiResponse({
    description: 'roadmap created information',
    isArray: false,
    type: ResourceRoadmapDto,
  })
  create(@Body() roadmap: CreateRoadmapDto) {
    return this._roadmapService.create(roadmap);
  }

  @Patch()
  @Roles([
    AllowRoles.admin,
    AllowRoles.contentManager,
    AllowRoles.instructor,
    AllowRoles.learner,
  ])
  @ApiResponse({
    description: 'roadmap updated information',
    isArray: false,
    type: ResourceRoadmapDto,
  })
  update(@Body() roadmap: UpdateRoadmapDto) {
    return this._roadmapService.update(roadmap);
  }

  @Delete('/:id')
  @Roles([AllowRoles.admin, AllowRoles.contentManager, AllowRoles.instructor])
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
