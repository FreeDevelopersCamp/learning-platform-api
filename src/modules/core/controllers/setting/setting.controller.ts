import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { SettingService } from '../../services/setting/setting.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
import { CreateSettingDto } from '../../dto/setting/create.setting';
import { UpdateSettingDto } from '../../dto/setting/update.setting';
import { ResourceSettingDto } from '../../dto/setting/resource.setting';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';

@ApiBearerAuth('authorization')
@ApiTags('setting')
// @UseGuards(RolesGuard)
@Controller('setting')
export class SettingController {
  constructor(private readonly _settingService: SettingService) {}

  @Get()
  @ApiResponse({
    description: 'List of setting',
    isArray: true,
    type: ResourceSettingDto,
  })
  // @Roles([AllowRoles.admin, AllowRoles.manager])
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
  list() {
    return this._settingService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  // @Roles([AllowRoles.admin, AllowRoles.manager])
  @ApiResponse({
    description: 'setting information',
    isArray: false,
    type: ResourceSettingDto,
  })
  getById(@Param('id') id: string) {
    return this._settingService.getById(id);
  }

  @Post()
  @UsePipes(new SchemaValidation())
  @UsePipes(new ObjectIdValidationPipe())
  // @Roles([AllowRoles.admin, AllowRoles.manager])
  @ApiResponse({
    description: 'setting created information',
    isArray: false,
    type: ResourceSettingDto,
  })
  create(@Body() setting: CreateSettingDto) {
    return this._settingService.create(setting);
  }

  @Patch()
  @UsePipes(new ObjectIdValidationPipe(), new SchemaValidation())
  @ApiResponse({
    description: 'setting updated information',
    isArray: false,
    type: ResourceSettingDto,
  })
  // @Roles([AllowRoles.admin, AllowRoles.manager])
  update(@Body() setting: UpdateSettingDto) {
    return this._settingService.update(setting);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  // @Roles([AllowRoles.admin, AllowRoles.manager])
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceSettingDto,
  })
  delete(@Param('id') id: string) {
    return this._settingService.delete(id);
  }

  @Post('/seed')
  @UsePipes(new ObjectIdValidationPipe())
  // @Roles([AllowRoles.admin, AllowRoles.manager])
  @ApiResponse({
    description: 'Seed result',
    type: Boolean,
  })
  seed() {
    return this._settingService.seed();
  }
}
