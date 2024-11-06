import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ProjectService } from '../../services/project/project.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CreateProjectDto } from '../../dto/project/create.project';
import { UpdateProjectDto } from '../../dto/project/update.project';
import { ResourceProjectDto } from '../../dto/project/resource.project';
import { AuthGuard } from 'src/modules/authentication/guards/auth/auth.guard';
import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';

@ApiBearerAuth('authorization')
@ApiTags('project')
@Controller('project')
@UseGuards(AuthGuard, RolesGuard)
export class ProjectController {
  constructor(private readonly _projectService: ProjectService) {}

  @Get()
  @Roles([
    AllowRoles.admin,
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
    description: 'List of project',
    isArray: true,
    type: ResourceProjectDto,
  })
  list() {
    return this._projectService.list();
  }

  @Get('/courseByInstructor/:id')
  @UsePipes(new ObjectIdValidationPipe())
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
    type: ResourceProjectDto,
  })
  listByInstructor(@Param('id') id: string) {
    return this._projectService.listByInstructor(id);
  }

  @Get('/:id')
  @Roles([
    AllowRoles.admin,
    AllowRoles.contentManager,
    AllowRoles.instructor,
    AllowRoles.learner,
  ])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'project information',
    isArray: false,
    type: ResourceProjectDto,
  })
  getById(@Param('id') id: string) {
    return this._projectService.getById(id);
  }

  @Post()
  @Roles([AllowRoles.admin, AllowRoles.contentManager, AllowRoles.instructor])
  @ApiResponse({
    description: 'project created information',
    isArray: false,
    type: ResourceProjectDto,
  })
  create(@Body() project: CreateProjectDto) {
    return this._projectService.create(project);
  }

  @Patch()
  @Roles([AllowRoles.admin, AllowRoles.contentManager, AllowRoles.instructor])
  @ApiResponse({
    description: 'project updated information',
    isArray: false,
    type: ResourceProjectDto,
  })
  update(@Body() project: UpdateProjectDto) {
    return this._projectService.update(project);
  }

  @Delete('/:id')
  @Roles([AllowRoles.admin, AllowRoles.contentManager, AllowRoles.instructor])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceProjectDto,
  })
  delete(@Param('id') id: string) {
    return this._projectService.delete(id);
  }
}
