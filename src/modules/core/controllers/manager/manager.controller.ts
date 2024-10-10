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
import { ManagerService } from '../../services/manager/manager.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateManagerDto } from '../../dto/manager/create.manager';
import { UpdateManagerDto } from '../../dto/manager/update.manager';
import { ResourceManagerDto } from '../../dto/manager/resource.manager';

@ApiBearerAuth('authorization')
@ApiTags('manager')
@Controller('manager')
export class ManagerController {
  constructor(private readonly _managerService: ManagerService) {}

  @Get()
  @ApiResponse({
    description: 'List of manager',
    isArray: true,
    type: ResourceManagerDto,
  })
  list() {
    return this._managerService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'manager information',
    isArray: false,
    type: ResourceManagerDto,
  })
  getById(@Param('id') id: string) {
    return this._managerService.getById(id);
  }

  @Post()
  @ApiResponse({
    description: 'manager created information',
    isArray: false,
    type: ResourceManagerDto,
  })
  create(@Body() manager: CreateManagerDto) {
    return this._managerService.create(manager);
  }

  @Patch()
  @ApiResponse({
    description: 'manager updated information',
    isArray: false,
    type: ResourceManagerDto,
  })
  update(@Body() manager: UpdateManagerDto) {
    return this._managerService.update(manager);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceManagerDto,
  })
  delete(@Param('id') id: string) {
    return this._managerService.delete(id);
  }
}