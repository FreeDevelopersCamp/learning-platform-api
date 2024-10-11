import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ManagerService } from '../../services/manager/manager.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { CreateManagerDto } from '../../dto/manager/create.manager';
import { UpdateManagerDto } from '../../dto/manager/update.manager';
import { ResourceManagerDto } from '../../dto/manager/resource.manager';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';

@ApiBearerAuth('authorization')
@ApiTags('manager')
@Controller('manager')
@UseGuards(RolesGuard)
export class ManagerController {
  constructor(private readonly _managerService: ManagerService) {}

  @Get()
  @Roles([AllowRoles.admin, AllowRoles.owner, AllowRoles.manager])
  @ApiResponse({
    description: 'List of manager',
    isArray: true,
    type: ResourceManagerDto,
  })
  list() {
    return this._managerService.list();
  }

  @Get('/:id')
  @Roles([AllowRoles.admin, AllowRoles.owner, AllowRoles.manager])
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
  @ApiExcludeEndpoint()
  @ApiResponse({
    description: 'manager created information',
    isArray: false,
    type: ResourceManagerDto,
  })
  create(@Body() manager: CreateManagerDto) {
    return this._managerService.create(manager);
  }

  @Patch()
  @Roles([AllowRoles.admin, AllowRoles.manager])
  @ApiResponse({
    description: 'manager updated information',
    isArray: false,
    type: ResourceManagerDto,
  })
  update(@Body() manager: UpdateManagerDto) {
    return this._managerService.update(manager);
  }

  @Delete('/:id')
  @Roles([AllowRoles.admin, AllowRoles.manager])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceManagerDto,
  })
  delete(@Param('id') id: string) {
    return this._managerService.delete(id);
  }

  @Get('/approve/:id')
  @Roles([AllowRoles.admin, AllowRoles.owner])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Manager approved information',
    isArray: false,
    type: ResourceManagerDto,
  })
  approve(@Param('id') id: string) {
    return this._managerService.approve(id);
  }

  @Delete('/reject/:id')
  @Roles([AllowRoles.admin, AllowRoles.owner])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Manager approved information',
    isArray: false,
    type: ResourceManagerDto,
  })
  reject(@Param('id') id: string) {
    return this._managerService.reject(id);
  }
}
