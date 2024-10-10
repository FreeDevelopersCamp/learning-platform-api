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
import { ContentManagerService } from '../../services/ContentManager/ContentManager.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateContentManagerDto } from '../../dto/ContentManager/create.ContentManager';
import { UpdateContentManagerDto } from '../../dto/ContentManager/update.ContentManager';
import { ResourceContentManagerDto } from '../../dto/ContentManager/resource.ContentManager';

@ApiBearerAuth('authorization')
@ApiTags('ContentManager')
@Controller('ContentManager')
export class ContentManagerController {
  constructor(private readonly _ContentManagerService: ContentManagerService) {}

  @Get()
  @ApiResponse({
    description: 'List of ContentManager',
    isArray: true,
    type: ResourceContentManagerDto,
  })
  list() {
    return this._ContentManagerService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'ContentManager information',
    isArray: false,
    type: ResourceContentManagerDto,
  })
  getById(@Param('id') id: string) {
    return this._ContentManagerService.getById(id);
  }

  @Post()
  @ApiResponse({
    description: 'ContentManager created information',
    isArray: false,
    type: ResourceContentManagerDto,
  })
  create(@Body() ContentManager: CreateContentManagerDto) {
    return this._ContentManagerService.create(ContentManager);
  }

  @Patch()
  @ApiResponse({
    description: 'ContentManager updated information',
    isArray: false,
    type: ResourceContentManagerDto,
  })
  update(@Body() ContentManager: UpdateContentManagerDto) {
    return this._ContentManagerService.update(ContentManager);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceContentManagerDto,
  })
  delete(@Param('id') id: string) {
    return this._ContentManagerService.delete(id);
  }
}
