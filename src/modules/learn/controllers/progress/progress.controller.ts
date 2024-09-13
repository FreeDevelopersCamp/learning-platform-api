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
  import { ProgressService } from '../../services/progress/progress.service';
  import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
  import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
  import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
  import { CreateProgressDto } from '../../dto/progress/create.progress';
  import { UpdateProgressDto } from '../../dto/progress/update.progress';
  import { ResourceProgressDto } from '../../dto/progress/resource.progress';
  
  @ApiBearerAuth('authorization')
  @ApiTags('progress')
  @Controller('progress')
  export class ProgressController {
    constructor(private readonly _progressService: ProgressService) {}
  
    @Get()
    @ApiResponse({
    description: 'List of progress',
    isArray: true,
    type: ResourceProgressDto,
    })
    list() {
      return this._progressService.list();
    }
  
    @Get('/:id')
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'progress information',
    isArray: false,
    type: ResourceProgressDto,
    })
    getById(@Param('id') id: string) {
      return this._progressService.getById(id);
    }
  
    @Post()
    @UsePipes(new SchemaValidation())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'progress created information',
    isArray: false,
    type: ResourceProgressDto,
    })
    create(@Body() progress: CreateProgressDto) {
      return this._progressService.create(progress);
    }
  
    @Patch()
    @UsePipes(new ObjectIdValidationPipe(), new SchemaValidation())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'progress updated information',
    isArray: false,
    type: ResourceProgressDto,
    })
    update(@Body() progress: UpdateProgressDto) {
      return this._progressService.update(progress);
    }
  
    @Delete('/:id')
    @UsePipes(new ObjectIdValidationPipe())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceProgressDto,
    })
    delete(@Param('id') id: string) {
      return this._progressService.delete(id);
    }
  }  
