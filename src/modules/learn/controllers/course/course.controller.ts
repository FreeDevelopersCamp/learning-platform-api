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
import { CourseService } from '../../services/course/course.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiQuery,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { CreateCourseDto } from '../../dto/course/create.course';
import { UpdateCourseDto } from '../../dto/course/update.course';
import { ResourceCourseDto } from '../../dto/course/resource.course';
import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';

@ApiBearerAuth('authorization')
@ApiTags('course')
@Controller('course')
@UseGuards(RolesGuard)
export class CourseController {
  constructor(private readonly _courseService: CourseService) {}

  @Get()
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
    type: ResourceCourseDto,
  })
  list() {
    return this._courseService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'course information',
    isArray: false,
    type: ResourceCourseDto,
  })
  getById(@Param('id') id: string) {
    return this._courseService.getById(id);
  }

  @Post()
  @ApiExcludeEndpoint()
  @UsePipes(new SchemaValidation())
  @ApiResponse({
    description: 'course created information',
    isArray: false,
    type: ResourceCourseDto,
  })
  create(@Body() course: CreateCourseDto) {
    return this._courseService.create(course);
  }

  @Patch()
  @ApiExcludeEndpoint()
  @UsePipes(new SchemaValidation())
  @ApiResponse({
    description: 'course updated information',
    isArray: false,
    type: ResourceCourseDto,
  })
  update(@Body() course: UpdateCourseDto) {
    return this._courseService.update(course);
  }

  @Delete('/:id')
  @ApiExcludeEndpoint()
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceCourseDto,
  })
  delete(@Param('id') id: string) {
    return this._courseService.delete(id);
  }
}
