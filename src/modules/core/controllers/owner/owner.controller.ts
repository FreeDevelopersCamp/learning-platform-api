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
import { OwnerService } from '../../services/owner/owner.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { CreateOwnerDto } from '../../dto/owner/create.owner';
import { UpdateOwnerDto } from '../../dto/owner/update.owner';
import { ResourceOwnerDto } from '../../dto/owner/resource.owner';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { ResourceManagerDto } from '../../dto/manager/resource.manager';

@ApiBearerAuth('authorization')
@ApiTags('owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly _ownerService: OwnerService) {}

  @Get()
  @Roles([AllowRoles.admin, AllowRoles.owner])
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

  @Get('/manager')
  @Roles([AllowRoles.admin, AllowRoles.owner])
  @ApiResponse({
    description: 'List of managers',
    isArray: true,
    type: ResourceManagerDto,
  })
  listManagers() {
    return this._ownerService.listManagers();
  }

  @Patch('/manager/approve')
  @Roles([AllowRoles.admin, AllowRoles.owner])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Manager approved information',
    isArray: false,
    type: ResourceManagerDto,
  })
  approveManager(@Param('id') id: string) {
    return this._ownerService.approveManager(id);
  }
}
