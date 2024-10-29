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
import { ContentManagerService } from '../../services/ContentManager/ContentManager.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiExcludeEndpoint,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateContentManagerDto } from '../../dto/ContentManager/create.ContentManager';
import { UpdateContentManagerDto } from '../../dto/ContentManager/update.ContentManager';
import { ResourceContentManagerDto } from '../../dto/ContentManager/resource.ContentManager';
import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';
import { AuthGuard } from 'src/modules/authentication/guards/auth/auth.guard';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';

@ApiBearerAuth('authorization')
@ApiTags('ContentManager')
@Controller('ContentManager')
@UseGuards(AuthGuard, RolesGuard)
export class ContentManagerController {
  constructor(private readonly _contentManagerService: ContentManagerService) {}

  @Get()
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.contentManager,
  ])
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
    description: 'List of ContentManager',
    isArray: true,
    type: ResourceContentManagerDto,
  })
  list() {
    return this._contentManagerService.list();
  }

  @Get('/:id')
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.contentManager,
  ])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'ContentManager information',
    isArray: false,
    type: ResourceContentManagerDto,
  })
  getById(@Param('id') id: string) {
    return this._contentManagerService.getById(id);
  }

  @Post()
  @ApiExcludeEndpoint()
  @ApiResponse({
    description: 'ContentManager created information',
    isArray: false,
    type: ResourceContentManagerDto,
  })
  create(@Body() ContentManager: CreateContentManagerDto) {
    return this._contentManagerService.create(ContentManager);
  }

  @Patch()
  @Roles([AllowRoles.admin, AllowRoles.contentManager])
  @ApiResponse({
    description: 'ContentManager updated information',
    isArray: false,
    type: ResourceContentManagerDto,
  })
  update(@Body() ContentManager: UpdateContentManagerDto) {
    return this._contentManagerService.update(ContentManager);
  }

  @Delete('/:id')
  @Roles([AllowRoles.admin])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceContentManagerDto,
  })
  delete(@Param('id') id: string) {
    return this._contentManagerService.delete(id);
  }

  @Delete('/deactivate/:id')
  @Roles([
    AllowRoles.admin,
    AllowRoles.owner,
    AllowRoles.manager,
    AllowRoles.contentManager,
  ])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deactivate owner account',
    isArray: false,
    type: ResourceContentManagerDto,
  })
  deactivate(@Param('id') id: string) {
    return this._contentManagerService.deactivate(id);
  }

  @Get('/approve/:id')
  @Roles([AllowRoles.admin, AllowRoles.owner, AllowRoles.manager])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Manager approved information',
    isArray: false,
    type: ResourceContentManagerDto,
  })
  approve(@Param('id') id: string) {
    return this._contentManagerService.approve(id);
  }

  @Delete('/reject/:id')
  @Roles([AllowRoles.admin, AllowRoles.owner, AllowRoles.manager])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Manager approved information',
    isArray: false,
    type: ResourceContentManagerDto,
  })
  reject(@Param('id') id: string) {
    return this._contentManagerService.reject(id);
  }
}
