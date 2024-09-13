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
  import { ProjectService } from '../../services/project/project.service';
  import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
  import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
  import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
  import { CreateProjectDto } from '../../dto/project/create.project';
  import { UpdateProjectDto } from '../../dto/project/update.project';
  import { ResourceProjectDto } from '../../dto/project/resource.project';
  
  @ApiBearerAuth('authorization')
  @ApiTags('project')
  @Controller('project')
  export class ProjectController {
    constructor(private readonly _projectService: ProjectService) {}
  
    @Get()
    @ApiResponse({
    description: 'List of project',
    isArray: true,
    type: ResourceProjectDto,
    })
    list() {
      return this._projectService.list();
    }
  
    @Get('/:id')
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
    @UsePipes(new SchemaValidation())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'project created information',
    isArray: false,
    type: ResourceProjectDto,
    })
    create(@Body() project: CreateProjectDto) {
      return this._projectService.create(project);
    }
  
    @Patch()
    @UsePipes(new ObjectIdValidationPipe(), new SchemaValidation())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'project updated information',
    isArray: false,
    type: ResourceProjectDto,
    })
    update(@Body() project: UpdateProjectDto) {
      return this._projectService.update(project);
    }
  
    @Delete('/:id')
    @UsePipes(new ObjectIdValidationPipe())
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
