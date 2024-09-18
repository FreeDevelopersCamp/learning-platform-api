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
import { TutorialService } from '../../services/tutorial/tutorial.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
import { CreateTutorialDto } from '../../dto/tutorial/create.tutorial';
import { UpdateTutorialDto } from '../../dto/tutorial/update.tutorial';
import { ResourceTutorialDto } from '../../dto/tutorial/resource.tutorial';

@ApiBearerAuth('authorization')
@ApiTags('tutorial')
@Controller('tutorial')
export class TutorialController {
  constructor(private readonly _tutorialService: TutorialService) {}

  @Get()
  @ApiResponse({
    description: 'List of tutorial',
    isArray: true,
    type: ResourceTutorialDto,
  })
  list() {
    return this._tutorialService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'tutorial information',
    isArray: false,
    type: ResourceTutorialDto,
  })
  getById(@Param('id') id: string) {
    return this._tutorialService.getById(id);
  }

  @Post()
  @UsePipes(new SchemaValidation())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'tutorial created information',
    isArray: false,
    type: ResourceTutorialDto,
  })
  create(@Body() tutorial: CreateTutorialDto) {
    return this._tutorialService.create(tutorial);
  }

  @Patch()
  @UsePipes(new ObjectIdValidationPipe(), new SchemaValidation())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'tutorial updated information',
    isArray: false,
    type: ResourceTutorialDto,
  })
  update(@Body() tutorial: UpdateTutorialDto) {
    return this._tutorialService.update(tutorial);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceTutorialDto,
  })
  delete(@Param('id') id: string) {
    return this._tutorialService.delete(id);
  }
}
