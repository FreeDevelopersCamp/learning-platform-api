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
import { PracticeService } from '../../services/practice/practice.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CreatePracticeDto } from '../../dto/practice/create.practice';
import { UpdatePracticeDto } from '../../dto/practice/update.practice';
import { ResourcePracticeDto } from '../../dto/practice/resource.practice';
import { AuthGuard } from 'src/modules/authentication/guards/auth/auth.guard';
import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';

@ApiBearerAuth('authorization')
@ApiTags('practice')
@Controller('practice')
@UseGuards(AuthGuard, RolesGuard)
export class PracticeController {
  constructor(private readonly _practiceService: PracticeService) {}

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
    description: 'List of practice',
    isArray: true,
    type: ResourcePracticeDto,
  })
  list() {
    return this._practiceService.list();
  }

  @Get('/practiceByInstructor/:id')
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
    description: 'List of course',
    isArray: true,
    type: ResourcePracticeDto,
  })
  listByInstructor(@Param('id') id: string) {
    return this._practiceService.listByInstructor(id);
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
    description: 'practice information',
    isArray: false,
    type: ResourcePracticeDto,
  })
  getById(@Param('id') id: string) {
    return this._practiceService.getById(id);
  }

  @Post()
  @Roles([AllowRoles.admin, AllowRoles.contentManager, AllowRoles.instructor])
  @ApiResponse({
    description: 'practice created information',
    isArray: false,
    type: ResourcePracticeDto,
  })
  create(@Body() practice: CreatePracticeDto) {
    return this._practiceService.create(practice);
  }

  @Patch()
  @Roles([AllowRoles.admin, AllowRoles.contentManager, AllowRoles.instructor])
  @ApiResponse({
    description: 'practice updated information',
    isArray: false,
    type: ResourcePracticeDto,
  })
  update(@Body() practice: UpdatePracticeDto) {
    return this._practiceService.update(practice);
  }

  @Delete('/:id')
  @Roles([AllowRoles.admin, AllowRoles.contentManager, AllowRoles.instructor])
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
