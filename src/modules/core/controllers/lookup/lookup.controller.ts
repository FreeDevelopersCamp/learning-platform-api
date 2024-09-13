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
import { LookupService } from '../../services/lookup/lookup.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import {
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
import { UpdateLookupDto } from '../../dto/lookup/update.lookup';
import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';
import { CreateLookupDto } from '../../dto/lookup/create.lookup';
import { ResourceLookupDto } from '../../dto/lookup/resource.lookup';
import { AuthGuard } from 'src/modules/authentication/guards/auth/auth.guard';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';

@ApiBearerAuth('authorization')
@ApiTags('lookup')
@Controller('lookup')
export class LookupController {
  constructor(private readonly _lookupService: LookupService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'List of lookups',
    isArray: true,
    type: ResourceLookupDto,
  })
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
  list(): Promise<ResourceLookupDto[]> {
    return this._lookupService.list();
  }

  @Get('/getByGroupNames/:name')
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'List of lookups',
    isArray: true,
    type: ResourceLookupDto,
  })
  @ApiParam({
    name: 'name',
    type: String,
    description: 'Names of the lookups',
    required: true,
  })
  getByGroupNames(@Param('name') name: string): Promise<ResourceLookupDto[]> {
    return this._lookupService.getByGroupNames(name);
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'lookup information',
    isArray: false,
    type: ResourceLookupDto,
  })
  getById(@Param('id') id: string): Promise<ResourceLookupDto> {
    return this._lookupService.getById(id);
  }

  @Get('/getByName/:name')
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'List of lookups',
    isArray: true,
    type: ResourceLookupDto,
  })
  @ApiParam({
    name: 'name',
    type: String,
    description: 'Name of the lookup',
    required: true,
  })
  getByName(@Param('name') name: string): Promise<ResourceLookupDto> {
    return this._lookupService.getByName(name);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles([AllowRoles.admin])
  @ApiResponse({
    description: 'Created lookup information',
    isArray: false,
    type: ResourceLookupDto,
  })
  create(@Body() lookup: CreateLookupDto): Promise<ResourceLookupDto> {
    return this._lookupService.create(lookup);
  }

  @Patch()
  @UsePipes(new ObjectIdValidationPipe())
  @UseGuards(RolesGuard)
  @Roles([AllowRoles.admin])
  @ApiResponse({
    description: 'Updated lookup information',
    isArray: false,
    type: ResourceLookupDto,
  })
  update(@Body() lookup: UpdateLookupDto): Promise<ResourceLookupDto> {
    return this._lookupService.update(lookup);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @UseGuards(RolesGuard)
  @Roles([AllowRoles.admin])
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: Boolean,
  })
  delete(@Param('id') id: string): Promise<boolean> {
    return this._lookupService.delete(id);
  }

  @Post('/seed')
  @UsePipes(new SchemaValidation())
  @UseGuards(RolesGuard)
  @Roles([AllowRoles.admin])
  @ApiResponse({
    description: 'Created lookup information',
    isArray: false,
    type: Boolean,
  })
  seed(): Promise<boolean> {
    return this._lookupService.seed();
  }
}
