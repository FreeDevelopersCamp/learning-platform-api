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
import { ExamService } from '../../services/exam/exam.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateExamDto } from '../../dto/exam/create.exam';
import { UpdateExamDto } from '../../dto/exam/update.exam';
import { ResourceExamDto } from '../../dto/exam/resource.exam';

@ApiBearerAuth('authorization')
@ApiTags('exam')
@Controller('exam')
export class ExamController {
  constructor(private readonly _examService: ExamService) {}

  @Get()
  @ApiResponse({
    description: 'List of exam',
    isArray: true,
    type: ResourceExamDto,
  })
  list() {
    return this._examService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'exam information',
    isArray: false,
    type: ResourceExamDto,
  })
  getById(@Param('id') id: string) {
    return this._examService.getById(id);
  }

  @Post()
  @ApiResponse({
    description: 'exam created information',
    isArray: false,
    type: ResourceExamDto,
  })
  create(@Body() exam: CreateExamDto) {
    return this._examService.create(exam);
  }

  @Patch()
  @ApiResponse({
    description: 'exam updated information',
    isArray: false,
    type: ResourceExamDto,
  })
  update(@Body() exam: UpdateExamDto) {
    return this._examService.update(exam);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceExamDto,
  })
  delete(@Param('id') id: string) {
    return this._examService.delete(id);
  }
}
