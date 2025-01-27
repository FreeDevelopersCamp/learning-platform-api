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
import { InstructorService } from '../../services/instructor/instructor.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiExcludeEndpoint,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateInstructorDto } from '../../dto/instructor/create.instructor';
import { UpdateInstructorDto } from '../../dto/instructor/update.instructor';
import { ResourceInstructorDto } from '../../dto/instructor/resource.instructor';
import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';
import { AuthGuard } from 'src/modules/authentication/guards/auth/auth.guard';

@ApiBearerAuth('authorization')
@ApiTags('instructor')
@Controller('instructor')
@UseGuards(AuthGuard, RolesGuard)
export class InstructorController {
  constructor(private readonly _instructorService: InstructorService) {}

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
    description: 'List of instructor',
    isArray: true,
    type: ResourceInstructorDto,
  })
  list() {
    return this._instructorService.list();
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
    AllowRoles.learner,
  ])
  @ApiResponse({
    description: 'instructor information',
    isArray: false,
    type: ResourceInstructorDto,
  })
  getById(@Param('id') id: string) {
    return this._instructorService.getById(id);
  }

  @Get('/user/:userId')
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.accountManager,
    AllowRoles.contentManager,
    AllowRoles.instructor,
  ])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'instructor information',
    isArray: false,
    type: ResourceInstructorDto,
  })
  getByUserId(@Param('userId') userId: string) {
    return this._instructorService.getByUserId(userId);
  }

  @Post()
  @ApiExcludeEndpoint()
  @ApiResponse({
    description: 'instructor created information',
    isArray: false,
    type: ResourceInstructorDto,
  })
  create(@Body() instructor: CreateInstructorDto) {
    return this._instructorService.create(instructor);
  }

  @Patch()
  @Roles([AllowRoles.admin, AllowRoles.accountManager, AllowRoles.instructor])
  @ApiResponse({
    description: 'instructor updated information',
    isArray: false,
    type: ResourceInstructorDto,
  })
  update(@Body() instructor: UpdateInstructorDto) {
    return this._instructorService.update(instructor);
  }

  @Delete('/:id')
  @Roles([AllowRoles.admin])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceInstructorDto,
  })
  delete(@Param('id') id: string) {
    return this._instructorService.delete(id);
  }

  @Delete('/deactivate/:id')
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.accountManager,
    AllowRoles.instructor,
  ])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deactivate owner account',
    isArray: false,
    type: ResourceInstructorDto,
  })
  deactivate(@Param('id') id: string) {
    return this._instructorService.deactivate(id);
  }

  @Get('/approve/:id')
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.accountManager,
  ])
  @ApiResponse({
    description: 'Instructor approved information',
    isArray: false,
    type: ResourceInstructorDto,
  })
  approve(@Param('id') id: string) {
    return this._instructorService.approve(id);
  }

  @Get('/verify/:id')
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.accountManager,
  ])
  @ApiResponse({
    description: 'Instructor verify information',
    isArray: false,
    type: ResourceInstructorDto,
  })
  verify(@Param('id') id: string) {
    return this._instructorService.verify(id);
  }

  @Delete('/reject/:id')
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.accountManager,
  ])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Instructor reject information',
    isArray: false,
    type: ResourceInstructorDto,
  })
  reject(@Param('id') id: string) {
    return this._instructorService.reject(id);
  }
}
