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
  import { StudentService } from '../../services/student/student.service';
  import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
  import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
  import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
  import { CreateStudentDto } from '../../dto/student/create.student';
  import { UpdateStudentDto } from '../../dto/student/update.student';
  import { ResourceStudentDto } from '../../dto/student/resource.student';
  
  @ApiBearerAuth('authorization')
  @ApiTags('student')
  @Controller('student')
  export class StudentController {
    constructor(private readonly _studentService: StudentService) {}
  
    @Get()
    @ApiResponse({
    description: 'List of student',
    isArray: true,
    type: ResourceStudentDto,
    })
    list() {
      return this._studentService.list();
    }
  
    @Get('/:id')
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'student information',
    isArray: false,
    type: ResourceStudentDto,
    })
    getById(@Param('id') id: string) {
      return this._studentService.getById(id);
    }
  
    @Post()
    @UsePipes(new SchemaValidation())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'student created information',
    isArray: false,
    type: ResourceStudentDto,
    })
    create(@Body() student: CreateStudentDto) {
      return this._studentService.create(student);
    }
  
    @Patch()
    @UsePipes(new ObjectIdValidationPipe(), new SchemaValidation())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'student updated information',
    isArray: false,
    type: ResourceStudentDto,
    })
    update(@Body() student: UpdateStudentDto) {
      return this._studentService.update(student);
    }
  
    @Delete('/:id')
    @UsePipes(new ObjectIdValidationPipe())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceStudentDto,
    })
    delete(@Param('id') id: string) {
      return this._studentService.delete(id);
    }
  }  
