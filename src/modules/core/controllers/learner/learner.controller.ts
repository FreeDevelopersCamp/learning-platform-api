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
import { LearnerService } from '../../services/learner/learner.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateLearnerDto } from '../../dto/learner/create.learner';
import { UpdateLearnerDto } from '../../dto/learner/update.learner';
import { ResourceLearnerDto } from '../../dto/learner/resource.learner';

@ApiBearerAuth('authorization')
@ApiTags('learner')
@Controller('learner')
export class LearnerController {
  constructor(private readonly _learnerService: LearnerService) {}

  @Get()
  @ApiResponse({
    description: 'List of learner',
    isArray: true,
    type: ResourceLearnerDto,
  })
  list() {
    return this._learnerService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'learner information',
    isArray: false,
    type: ResourceLearnerDto,
  })
  getById(@Param('id') id: string) {
    return this._learnerService.getById(id);
  }

  @Post()
  @ApiResponse({
    description: 'learner created information',
    isArray: false,
    type: ResourceLearnerDto,
  })
  create(@Body() learner: CreateLearnerDto) {
    return this._learnerService.create(learner);
  }

  @Patch()
  @ApiResponse({
    description: 'learner updated information',
    isArray: false,
    type: ResourceLearnerDto,
  })
  update(@Body() learner: UpdateLearnerDto) {
    return this._learnerService.update(learner);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceLearnerDto,
  })
  delete(@Param('id') id: string) {
    return this._learnerService.delete(id);
  }
}
