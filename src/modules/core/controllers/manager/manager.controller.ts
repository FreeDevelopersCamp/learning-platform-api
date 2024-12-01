import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ManagerService } from '../../services/manager/manager.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiExcludeEndpoint,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateManagerDto } from '../../dto/manager/create.manager';
import { UpdateManagerDto } from '../../dto/manager/update.manager';
import { ResourceManagerDto } from '../../dto/manager/resource.manager';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
// import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
// import { AuthGuard } from 'src/modules/authentication/guards/auth/auth.guard';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';

@ApiBearerAuth('authorization')
@ApiTags('manager')
@Controller('manager')
// @UseGuards(RolesGuard)
// @UseGuards(AuthGuard, RolesGuard)
export class ManagerController {
  constructor(private readonly _managerService: ManagerService) {}

  @Get()
  // @Roles([AllowRoles.admin, AllowRoles.owner, AllowRoles.manager])
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
    description: 'List of manager',
    isArray: true,
    type: ResourceManagerDto,
  })
  list() {
    return this._managerService.list();
  }

  @Get('/:id')
  // @Roles([AllowRoles.admin, AllowRoles.owner, AllowRoles.manager])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'manager information',
    isArray: false,
    type: ResourceManagerDto,
  })
  getById(@Param('id') id: string) {
    return this._managerService.getById(id);
  }

  @Get('/user/:userId')
  // @Roles([AllowRoles.admin])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'manager information',
    isArray: false,
    type: ResourceManagerDto,
  })
  getByUserId(@Param('userId') userId: string) {
    return this._managerService.getByUserId(userId);
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
  // @Roles([AllowRoles.admin])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceManagerDto,
  })
  delete(@Param('id') id: string) {
    return this._managerService.delete(id);
  }

  @Delete('/deactivate/:id')
  // @Roles([AllowRoles.admin, AllowRoles.owner, AllowRoles.manager])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deactivate owner account',
    isArray: false,
    type: ResourceManagerDto,
  })
  deactivate(@Param('id') id: string) {
    return this._managerService.deactivate(id);
  }

  @Get('/approve/:id')
  // @Roles([AllowRoles.admin, AllowRoles.owner])
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
  // @Roles([AllowRoles.admin, AllowRoles.owner])
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
