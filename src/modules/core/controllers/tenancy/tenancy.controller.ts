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
import { TenancyService } from '../../services/tenancy/tenancy.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTenancyDto } from '../../dto/tenancy/create.tenancy';
import { ResourceTenancyDto } from '../../dto/tenancy/resource.tenancy';
import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';

@ApiBearerAuth('authorization')
@ApiTags('tenancy')
@Controller('tenancy')
@UseGuards(RolesGuard)
export class TenancyController {
  constructor(private readonly _tenancyService: TenancyService) {}

  @Get()
  @Roles([AllowRoles.admin])
  @ApiResponse({
    description: 'List of tenancies',
    isArray: true,
    type: ResourceTenancyDto,
  })
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
  list(): Promise<ResourceTenancyDto[]> {
    return this._tenancyService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @Roles([AllowRoles.admin])
  @ApiResponse({
    description: 'Tenancy information',
    isArray: false,
    type: ResourceTenancyDto,
  })
  getById(@Param('id') id: string): Promise<ResourceTenancyDto> {
    return this._tenancyService.getById(id);
  }

  @Post()
  @Roles([AllowRoles.admin])
  @ApiResponse({
    description: 'Created tenancy information',
    isArray: false,
    type: ResourceTenancyDto,
  })
  create(@Body() tenancy: CreateTenancyDto): Promise<ResourceTenancyDto> {
    return this._tenancyService.create(tenancy);
  }

  @Patch()
  @Roles([AllowRoles.admin])
  @ApiResponse({
    description: 'Updated tenancy information',
    isArray: false,
    type: ResourceTenancyDto,
  })
  update(@Body() tenancy: ResourceTenancyDto): Promise<ResourceTenancyDto> {
    return this._tenancyService.update(tenancy);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @Roles([AllowRoles.admin])
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: Boolean,
  })
  delete(@Param('id') id: string): Promise<Boolean> {
    return this._tenancyService.delete(id);
  }
}
