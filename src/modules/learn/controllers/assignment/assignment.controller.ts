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
import { AssignmentService } from '../../services/assignment/assignment.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
import { CreateAssignmentDto } from '../../dto/assignment/create.assignment';
import { UpdateAssignmentDto } from '../../dto/assignment/update.assignment';
import { ResourceAssignmentDto } from '../../dto/assignment/resource.assignment';

@ApiBearerAuth('authorization')
@ApiTags('assignment')
@Controller('assignment')
export class AssignmentController {
  constructor(private readonly _assignmentService: AssignmentService) {}

  @Get()
  @ApiResponse({
    description: 'List of assignment',
    isArray: true,
    type: ResourceAssignmentDto,
  })
  list() {
    return this._assignmentService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'assignment information',
    isArray: false,
    type: ResourceAssignmentDto,
  })
  getById(@Param('id') id: string) {
    return this._assignmentService.getById(id);
  }

  @Post()
  @UsePipes(new SchemaValidation())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'assignment created information',
    isArray: false,
    type: ResourceAssignmentDto,
  })
  create(@Body() assignment: CreateAssignmentDto) {
    return this._assignmentService.create(assignment);
  }

  @Patch()
  @UsePipes(new ObjectIdValidationPipe(), new SchemaValidation())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'assignment updated information',
    isArray: false,
    type: ResourceAssignmentDto,
  })
  update(@Body() assignment: UpdateAssignmentDto) {
    return this._assignmentService.update(assignment);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceAssignmentDto,
  })
  delete(@Param('id') id: string) {
    return this._assignmentService.delete(id);
  }
}
