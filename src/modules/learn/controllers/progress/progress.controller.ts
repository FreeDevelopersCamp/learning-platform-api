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
import { ResourceProgressDto } from '../../dto/progress/resource.progress';
import { AuthGuard } from 'src/modules/authentication/guards/auth/auth.guard';
import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';

@ApiBearerAuth('authorization')
@ApiTags('progress')
@Controller('progress')
@UseGuards(AuthGuard, RolesGuard)
export class ProgressController {
  constructor(private readonly _progressService: ProgressService) {}

  @Get()
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.accountManager,
    AllowRoles.contentManager,
    AllowRoles.instructor,
    AllowRoles.contentManager,
    AllowRoles.learner,
  ])
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
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.accountManager,
    AllowRoles.contentManager,
    AllowRoles.instructor,
    AllowRoles.contentManager,
    AllowRoles.learner,
  ])
  @ApiResponse({
    description: 'progress information',
    isArray: false,
    type: ResourceProgressDto,
  })
  getById(@Param('id') id: string) {
    return this._progressService.getById(id);
  }

  @Post()
  @UsePipes(new ObjectIdValidationPipe())
  @ApiExcludeEndpoint()
  @Roles([AllowRoles.learner])
  @ApiResponse({
    description: 'progress created information',
    isArray: false,
    type: ResourceProgressDto,
  })
  create(@Body() progress: CreateProgressDto) {
    return this._progressService.create(progress);
  }

  @Patch()
  @UsePipes(new ObjectIdValidationPipe())
  @Roles([AllowRoles.learner])
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
