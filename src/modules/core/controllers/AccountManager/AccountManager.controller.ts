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
import { AccountManagerService } from '../../services/AccountManager/AccountManager.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { CreateAccountManagerDto } from '../../dto/AccountManager/create.AccountManager';
import { UpdateAccountManagerDto } from '../../dto/AccountManager/update.AccountManager';
import { ResourceAccountManagerDto } from '../../dto/AccountManager/resource.AccountManager';
import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';
import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';

@ApiBearerAuth('authorization')
@ApiTags('AccountManager')
@Controller('AccountManager')
@UseGuards(RolesGuard)
export class AccountManagerController {
  constructor(private readonly _accountManagerService: AccountManagerService) {}

  @Get()
  @Roles([AllowRoles.admin, AllowRoles.manager, AllowRoles.accountManager])
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
  @Roles([AllowRoles.admin, AllowRoles.manager, AllowRoles.accountManager])
  @ApiResponse({
    description: 'AccountManager information',
    isArray: false,
    type: ResourceAccountManagerDto,
  })
  getById(@Param('id') id: string) {
    return this._accountManagerService.getById(id);
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
  @Roles([AllowRoles.admin, AllowRoles.accountManager])
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceAccountManagerDto,
  })
  delete(@Param('id') id: string) {
    return this._accountManagerService.delete(id);
  }

  @Get('/approve/:id')
  @Roles([AllowRoles.admin, AllowRoles.manager])
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
  @Roles([AllowRoles.admin, AllowRoles.manager])
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
