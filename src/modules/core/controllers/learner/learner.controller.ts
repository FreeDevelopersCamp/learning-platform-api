import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { LearnerService } from '../../services/learner/learner.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { CreateLearnerDto } from '../../dto/learner/create.learner';
import { UpdateLearnerDto } from '../../dto/learner/update.learner';
import { ResourceLearnerDto } from '../../dto/learner/resource.learner';
import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';

@ApiBearerAuth('authorization')
@ApiTags('learner')
@Controller('learner')
@UseGuards(RolesGuard)
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
  @ApiExcludeEndpoint()
  @ApiResponse({
    description: 'learner created information',
    isArray: false,
    type: ResourceLearnerDto,
  })
  create(@Body() learner: CreateLearnerDto) {
    return this._learnerService.create(learner);
  }

  @Patch()
  @Roles([AllowRoles.admin, AllowRoles.learner])
  @ApiResponse({
    description: 'learner updated information',
    isArray: false,
    type: ResourceLearnerDto,
  })
  update(@Body() learner: UpdateLearnerDto) {
    return this._learnerService.update(learner);
  }

  @Delete('/:id')
  @Roles([AllowRoles.admin, AllowRoles.learner])
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
