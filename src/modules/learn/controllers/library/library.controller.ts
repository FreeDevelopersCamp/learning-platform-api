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
  import { LibraryService } from '../../services/library/library.service';
  import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
  import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
  import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
  import { CreateLibraryDto } from '../../dto/library/create.library';
  import { UpdateLibraryDto } from '../../dto/library/update.library';
  import { ResourceLibraryDto } from '../../dto/library/resource.library';
  
  @ApiBearerAuth('authorization')
  @ApiTags('library')
  @Controller('library')
  export class LibraryController {
    constructor(private readonly _libraryService: LibraryService) {}
  
    @Get()
    @ApiResponse({
    description: 'List of library',
    isArray: true,
    type: ResourceLibraryDto,
    })
    list() {
      return this._libraryService.list();
    }
  
    @Get('/:id')
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'library information',
    isArray: false,
    type: ResourceLibraryDto,
    })
    getById(@Param('id') id: string) {
      return this._libraryService.getById(id);
    }
  
    @Post()
    @UsePipes(new SchemaValidation())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'library created information',
    isArray: false,
    type: ResourceLibraryDto,
    })
    create(@Body() library: CreateLibraryDto) {
      return this._libraryService.create(library);
    }
  
    @Patch()
    @UsePipes(new ObjectIdValidationPipe(), new SchemaValidation())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'library updated information',
    isArray: false,
    type: ResourceLibraryDto,
    })
    update(@Body() library: UpdateLibraryDto) {
      return this._libraryService.update(library);
    }
  
    @Delete('/:id')
    @UsePipes(new ObjectIdValidationPipe())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceLibraryDto,
    })
    delete(@Param('id') id: string) {
      return this._libraryService.delete(id);
    }
  }  
