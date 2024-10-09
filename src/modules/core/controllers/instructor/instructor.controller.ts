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
import { InstructorService } from '../../services/instructor/instructor.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateInstructorDto } from '../../dto/instructor/create.instructor';
import { UpdateInstructorDto } from '../../dto/instructor/update.instructor';
import { ResourceInstructorDto } from '../../dto/instructor/resource.instructor';

@ApiBearerAuth('authorization')
@ApiTags('instructor')
@Controller('instructor')
export class InstructorController {
  constructor(private readonly _instructorService: InstructorService) {}

  @Get()
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
  @ApiResponse({
    description: 'instructor information',
    isArray: false,
    type: ResourceInstructorDto,
  })
  getById(@Param('id') id: string) {
    return this._instructorService.getById(id);
  }

  @Post()
  @ApiResponse({
    description: 'instructor created information',
    isArray: false,
    type: ResourceInstructorDto,
  })
  create(@Body() instructor: CreateInstructorDto) {
    return this._instructorService.create(instructor);
  }

  @Patch()
  @ApiResponse({
    description: 'instructor updated information',
    isArray: false,
    type: ResourceInstructorDto,
  })
  update(@Body() instructor: UpdateInstructorDto) {
    return this._instructorService.update(instructor);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceInstructorDto,
  })
  delete(@Param('id') id: string) {
    return this._instructorService.delete(id);
  }
}
