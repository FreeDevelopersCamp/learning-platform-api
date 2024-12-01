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
import { AdminService } from '../../services/admin/admin.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiQuery,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { CreateAdminDto } from '../../dto/admin/create.admin';
import { UpdateAdminDto } from '../../dto/admin/update.admin';
import { ResourceAdminDto } from '../../dto/admin/resource.admin';
// import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';
// import { AuthGuard } from 'src/modules/authentication/guards/auth/auth.guard';

@ApiBearerAuth('authorization')
@ApiTags('admin')
@Controller('admin')
// @UseGuards(RolesGuard)
// @UseGuards(AuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly _adminService: AdminService) {}

  @Get()
  // @Roles([AllowRoles.admin])
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
    description: 'List of admin',
    isArray: true,
    type: ResourceAdminDto,
  })
  list() {
    return this._adminService.list();
  }

  @Get('/:id')
  // @Roles([AllowRoles.admin])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'admin information',
    isArray: false,
    type: ResourceAdminDto,
  })
  getById(@Param('id') id: string) {
    return this._adminService.getById(id);
  }

  @Get('/user/:userId')
  // @Roles([AllowRoles.admin])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'admin information',
    isArray: false,
    type: ResourceAdminDto,
  })
  getByUserId(@Param('userId') userId: string) {
    return this._adminService.getByUserId(userId);
  }

  @Post()
  @Roles([AllowRoles.admin])
  @ApiExcludeEndpoint()
  @ApiResponse({
    description: 'admin created information',
    isArray: false,
    type: ResourceAdminDto,
  })
  create(@Body() admin: CreateAdminDto) {
    return this._adminService.create(admin);
  }

  @Patch()
  @Roles([AllowRoles.admin])
  @ApiResponse({
    description: 'admin updated information',
    isArray: false,
    type: ResourceAdminDto,
  })
  update(@Body() admin: UpdateAdminDto) {
    return this._adminService.update(admin);
  }

  @Delete('/:id')
  // @Roles([AllowRoles.admin])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceAdminDto,
  })
  delete(@Param('id') id: string) {
    return this._adminService.delete(id);
  }
}
