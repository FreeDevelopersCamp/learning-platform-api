import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { LearnerService } from '../../services/learner/learner.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiExcludeEndpoint,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateLearnerDto } from '../../dto/learner/create.learner';
import { UpdateLearnerDto } from '../../dto/learner/update.learner';
import { ResourceLearnerDto } from '../../dto/learner/resource.learner';
import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';
import { AuthGuard } from 'src/modules/authentication/guards/auth/auth.guard';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';
import { ResourceCourseDto } from 'src/modules/learn/dto/course/resource.course';
import { RatingDto } from 'src/modules/learn/dto/course/update.course';

@ApiBearerAuth('authorization')
@ApiTags('learner')
@Controller('learner')
@UseGuards(AuthGuard, RolesGuard)
export class LearnerController {
  constructor(private readonly _learnerService: LearnerService) {}

  @Get()
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.accountManager,
    AllowRoles.contentManager,
    AllowRoles.instructor,
    AllowRoles.learner,
  ])
  @UseInterceptors(PaginationInterceptor)
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page',
    type: Number,
  })
  @ApiResponse({
    description: 'List of learner',
    isArray: true,
    type: ResourceLearnerDto,
  })
  list() {
    return this._learnerService.list();
  }

  @Get('/:id')
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.accountManager,
    AllowRoles.contentManager,
    AllowRoles.instructor,
    AllowRoles.learner,
  ])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'learner information',
    isArray: false,
    type: ResourceLearnerDto,
  })
  getById(@Param('id') id: string) {
    return this._learnerService.getById(id);
  }

  @Get('/user/:userId')
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.accountManager,
    AllowRoles.contentManager,
    AllowRoles.learner,
  ])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'learner information',
    isArray: false,
    type: ResourceLearnerDto,
  })
  getByUserId(@Param('userId') userId: string) {
    return this._learnerService.getByUserId(userId);
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
  @Roles([AllowRoles.admin, AllowRoles.accountManager, AllowRoles.learner])
  @ApiResponse({
    description: 'learner updated information',
    isArray: false,
    type: ResourceLearnerDto,
  })
  update(@Body() learner: UpdateLearnerDto) {
    return this._learnerService.update(learner);
  }

  @Delete('/:id')
  @Roles([AllowRoles.admin])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceLearnerDto,
  })
  delete(@Param('id') id: string) {
    return this._learnerService.delete(id);
  }

  @Delete('/deactivate/:id')
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.accountManager,
    AllowRoles.learner,
  ])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deactivate owner account',
    isArray: false,
    type: ResourceLearnerDto,
  })
  deactivate(@Param('id') id: string) {
    return this._learnerService.deactivate(id);
  }

  @Get('/approve/:id')
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.accountManager,
  ])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Manager approved information',
    isArray: false,
    type: ResourceLearnerDto,
  })
  approve(@Param('id') id: string) {
    return this._learnerService.approve(id);
  }

  @Post('/rating')
  @Roles([AllowRoles.learner])
  @ApiResponse({
    description: 'Rating course',
    isArray: false,
    type: ResourceCourseDto,
  })
  addRating(@Body() dto: RatingDto) {
    return this._learnerService.addRating(dto);
  }
}
