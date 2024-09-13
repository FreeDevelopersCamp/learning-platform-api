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
  import { PracticeService } from '../../services/practice/practice.service';
  import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
  import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
  import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
  import { CreatePracticeDto } from '../../dto/practice/create.practice';
  import { UpdatePracticeDto } from '../../dto/practice/update.practice';
  import { ResourcePracticeDto } from '../../dto/practice/resource.practice';
  
  @ApiBearerAuth('authorization')
  @ApiTags('practice')
  @Controller('practice')
  export class PracticeController {
    constructor(private readonly _practiceService: PracticeService) {}
  
    @Get()
    @ApiResponse({
    description: 'List of practice',
    isArray: true,
    type: ResourcePracticeDto,
    })
    list() {
      return this._practiceService.list();
    }
  
    @Get('/:id')
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'practice information',
    isArray: false,
    type: ResourcePracticeDto,
    })
    getById(@Param('id') id: string) {
      return this._practiceService.getById(id);
    }
  
    @Post()
    @UsePipes(new SchemaValidation())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'practice created information',
    isArray: false,
    type: ResourcePracticeDto,
    })
    create(@Body() practice: CreatePracticeDto) {
      return this._practiceService.create(practice);
    }
  
    @Patch()
    @UsePipes(new ObjectIdValidationPipe(), new SchemaValidation())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'practice updated information',
    isArray: false,
    type: ResourcePracticeDto,
    })
    update(@Body() practice: UpdatePracticeDto) {
      return this._practiceService.update(practice);
    }
  
    @Delete('/:id')
    @UsePipes(new ObjectIdValidationPipe())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourcePracticeDto,
    })
    delete(@Param('id') id: string) {
      return this._practiceService.delete(id);
    }
  }  
