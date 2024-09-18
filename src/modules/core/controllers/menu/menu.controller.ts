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
import { MenuService } from '../../services/menu/menu.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMenuDto } from '../../dto/menu/create.menu';
import { UpdateMenuDto } from '../../dto/menu/update.menu';
import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';
import { ResourceMenuDto } from '../../dto/menu/resource.menu';
import { AuthGuard } from 'src/modules/authentication/guards/auth/auth.guard';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';

@ApiBearerAuth('authorization')
@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly _menuService: MenuService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(PaginationInterceptor)
  @ApiResponse({
    description: 'List of menus',
    isArray: true,
    type: ResourceMenuDto,
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
  list(): Promise<ResourceMenuDto[]> {
    return this._menuService.list();
  }

  @Get('/:id')
  @UseGuards(RolesGuard)
  @Roles([AllowRoles.admin])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Menu information',
    isArray: false,
    type: ResourceMenuDto,
  })
  async getById(@Param('id') id: string): Promise<ResourceMenuDto> {
    return this._menuService.getById(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles([AllowRoles.admin])
  @ApiResponse({
    description: 'Created menu information',
    isArray: false,
    type: ResourceMenuDto,
  })
  create(@Body() menu: CreateMenuDto): Promise<ResourceMenuDto> {
    return this._menuService.create(menu);
  }

  @Patch()
  @UseGuards(RolesGuard)
  @Roles([AllowRoles.admin])
  @ApiResponse({
    description: 'Updated menu information',
    isArray: false,
    type: ResourceMenuDto,
  })
  update(@Body() menu: UpdateMenuDto): Promise<ResourceMenuDto> {
    return this._menuService.update(menu);
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
  delete(@Param('id') id: string): Promise<Boolean> {
    return this._menuService.delete(id);
  }
}
