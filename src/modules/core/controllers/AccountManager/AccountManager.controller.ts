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
import { AccountManagerService } from '../../services/AccountManager/AccountManager.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiExcludeEndpoint,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateAccountManagerDto } from '../../dto/AccountManager/create.AccountManager';
import { UpdateAccountManagerDto } from '../../dto/AccountManager/update.AccountManager';
import { ResourceAccountManagerDto } from '../../dto/AccountManager/resource.AccountManager';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';
// import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
// import { AuthGuard } from 'src/modules/authentication/guards/auth/auth.guard';

@ApiBearerAuth('authorization')
@ApiTags('AccountManager')
@Controller('AccountManager')
// @UseGuards(RolesGuard)
// @UseGuards(AuthGuard, RolesGuard)
export class AccountManagerController {
  constructor(private readonly _accountManagerService: AccountManagerService) {}

  @Get()
  // @Roles([
  //   AllowRoles.admin,
  //   AllowRoles.owner,
  //   AllowRoles.manager,
  //   AllowRoles.accountManager,
  // ])
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
    description: 'List of AccountManager',
    isArray: true,
    type: ResourceAccountManagerDto,
  })
  list() {
    return this._accountManagerService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  // @Roles([
  //   AllowRoles.admin,
  //   AllowRoles.owner,
  //   AllowRoles.manager,
  //   AllowRoles.accountManager,
  // ])
  @ApiResponse({
    description: 'AccountManager information',
    isArray: false,
    type: ResourceAccountManagerDto,
  })
  getById(@Param('id') id: string) {
    return this._accountManagerService.getById(id);
  }

  @Get('/user/:userId')
  // @Roles([AllowRoles.admin])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'AccountManager information',
    isArray: false,
    type: ResourceAccountManagerDto,
  })
  getByUserId(@Param('userId') userId: string) {
    return this._accountManagerService.getByUserId(userId);
  }

  @Post()
  @ApiExcludeEndpoint()
  @ApiResponse({
    description: 'AccountManager created information',
    isArray: false,
    type: ResourceAccountManagerDto,
  })
  create(@Body() AccountManager: CreateAccountManagerDto) {
    return this._accountManagerService.create(AccountManager);
  }

  @Patch()
  @Roles([AllowRoles.admin, AllowRoles.accountManager])
  @ApiResponse({
    description: 'AccountManager updated information',
    isArray: false,
    type: ResourceAccountManagerDto,
  })
  update(@Body() AccountManager: UpdateAccountManagerDto) {
    return this._accountManagerService.update(AccountManager);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  // @Roles([AllowRoles.admin])
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceAccountManagerDto,
  })
  delete(@Param('id') id: string) {
    return this._accountManagerService.delete(id);
  }

  @Delete('/deactivate/:id')
  // @Roles([
  //   AllowRoles.admin,
  //   AllowRoles.owner,
  //   AllowRoles.manager,
  //   AllowRoles.accountManager,
  // ])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deactivate owner account',
    isArray: false,
    type: ResourceAccountManagerDto,
  })
  deactivate(@Param('id') id: string) {
    return this._accountManagerService.deactivate(id);
  }

  @Get('/approve/:id')
  // @Roles([AllowRoles.admin, AllowRoles.owner, AllowRoles.manager])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Manager approved information',
    isArray: false,
    type: ResourceAccountManagerDto,
  })
  approve(@Param('id') id: string) {
    return this._accountManagerService.approve(id);
  }

  @Delete('/reject/:id')
  // @Roles([AllowRoles.admin, AllowRoles.owner, AllowRoles.manager])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Manager approved information',
    isArray: false,
    type: ResourceAccountManagerDto,
  })
  reject(@Param('id') id: string) {
    return this._accountManagerService.reject(id);
  }
}
