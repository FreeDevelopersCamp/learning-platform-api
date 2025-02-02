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
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { CreateProgressDto } from '../../dto/progress/create.progress';
import { UpdateProgressDto } from '../../dto/progress/update.progress';
import {
  ResourceProgressDto,
  UpdateProjectReviewDto,
} from '../../dto/progress/resource.progress';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';

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

  @Get('/details/:userId')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'progress information',
    isArray: false,
    type: ResourceProgressDto,
  })
  getDetails(@Param('userId') userId: string) {
    return this._progressService.getDetails(userId);
  }

  @Get('userId/:userId')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'progress information',
    isArray: false,
    type: ResourceProgressDto,
  })
  getByUserId(@Param('userId') id: string) {
    return this._progressService.getByUserId(id);
  }

  @Post()
  @UsePipes(new ObjectIdValidationPipe())
  @ApiExcludeEndpoint()
  @ApiResponse({
    description: 'progress created information',
    isArray: false,
    type: ResourceProgressDto,
  })
  create(@Body() progress: CreateProgressDto) {
    return this._progressService.create(progress);
  }

  @Patch()
  @ApiResponse({
    description: 'progress updated information',
    isArray: false,
    type: ResourceProgressDto,
  })
  update(@Body() progress: UpdateProgressDto) {
    return this._progressService.update(progress, false);
  }

  @Patch('review')
  @ApiResponse({
    description: 'progress updated information',
    isArray: false,
    type: ResourceProgressDto,
  })
  updateProjectsReview(@Body() progress: UpdateProjectReviewDto) {
    return this._progressService.updateProjectsReview(progress);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiExcludeEndpoint()
  @Roles([AllowRoles.learner])
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceProgressDto,
  })
  delete(@Param('id') id: string) {
    return this._progressService.delete(id);
  }
}
