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
import { TeacherService } from '../../services/teacher/teacher.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateTeacherDto } from '../../dto/teacher/create.teacher';
import { UpdateTeacherDto } from '../../dto/teacher/update.teacher';
import { ResourceTeacherDto } from '../../dto/teacher/resource.teacher';

@ApiBearerAuth('authorization')
@ApiTags('teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly _teacherService: TeacherService) {}

  @Get()
  @ApiResponse({
    description: 'List of teacher',
    isArray: true,
    type: ResourceTeacherDto,
  })
  list() {
    return this._teacherService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'teacher information',
    isArray: false,
    type: ResourceTeacherDto,
  })
  getById(@Param('id') id: string) {
    return this._teacherService.getById(id);
  }

  @Post()
  @ApiResponse({
    description: 'teacher created information',
    isArray: false,
    type: ResourceTeacherDto,
  })
  create(@Body() teacher: CreateTeacherDto) {
    return this._teacherService.create(teacher);
  }

  @Patch()
  @ApiResponse({
    description: 'teacher updated information',
    isArray: false,
    type: ResourceTeacherDto,
  })
  update(@Body() teacher: UpdateTeacherDto) {
    return this._teacherService.update(teacher);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceTeacherDto,
  })
  delete(@Param('id') id: string) {
    return this._teacherService.delete(id);
  }
}
