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
import { OwnerService } from '../../services/owner/owner.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiExcludeEndpoint,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateOwnerDto } from '../../dto/owner/create.owner';
import { UpdateOwnerDto } from '../../dto/owner/update.owner';
import { ResourceOwnerDto } from '../../dto/owner/resource.owner';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
import { AuthGuard } from 'src/modules/authentication/guards/auth/auth.guard';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';

@ApiBearerAuth('authorization')
@ApiTags('owner')
@Controller('owner')
@UseGuards(AuthGuard, RolesGuard)
export class OwnerController {
  constructor(private readonly _ownerService: OwnerService) {}

  @Get()
  @Roles([AllowRoles.admin, AllowRoles.owner])
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
    description: 'List of owner',
    isArray: true,
    type: ResourceOwnerDto,
  })
  list() {
    return this._ownerService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @Roles([AllowRoles.admin, AllowRoles.owner])
  @ApiResponse({
    description: 'owner information',
    isArray: false,
    type: ResourceOwnerDto,
  })
  getById(@Param('id') id: string) {
    return this._ownerService.getById(id);
  }

  @Post()
  @ApiExcludeEndpoint()
  @ApiResponse({
    description: 'owner created information',
    isArray: false,
    type: ResourceOwnerDto,
  })
  create(@Body() owner: CreateOwnerDto) {
    return this._ownerService.create(owner);
  }

  @Patch()
  @Roles([AllowRoles.admin, AllowRoles.owner])
  @ApiResponse({
    description: 'owner updated information',
    isArray: false,
    type: ResourceOwnerDto,
  })
  update(@Body() owner: UpdateOwnerDto) {
    return this._ownerService.update(owner);
  }

  @Delete('/:id')
  @Roles([AllowRoles.admin, AllowRoles.owner])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceOwnerDto,
  })
  delete(@Param('id') id: string) {
    return this._ownerService.delete(id);
  }
}
