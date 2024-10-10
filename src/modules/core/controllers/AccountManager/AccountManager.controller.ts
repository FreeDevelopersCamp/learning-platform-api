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
import { AccountManagerService } from '../../services/AccountManager/AccountManager.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateAccountManagerDto } from '../../dto/AccountManager/create.AccountManager';
import { UpdateAccountManagerDto } from '../../dto/AccountManager/update.AccountManager';
import { ResourceAccountManagerDto } from '../../dto/AccountManager/resource.AccountManager';

@ApiBearerAuth('authorization')
@ApiTags('AccountManager')
@Controller('AccountManager')
export class AccountManagerController {
  constructor(private readonly _AccountManagerService: AccountManagerService) {}

  @Get()
  @ApiResponse({
    description: 'List of AccountManager',
    isArray: true,
    type: ResourceAccountManagerDto,
  })
  list() {
    return this._AccountManagerService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'AccountManager information',
    isArray: false,
    type: ResourceAccountManagerDto,
  })
  getById(@Param('id') id: string) {
    return this._AccountManagerService.getById(id);
  }

  @Post()
  @ApiResponse({
    description: 'AccountManager created information',
    isArray: false,
    type: ResourceAccountManagerDto,
  })
  create(@Body() AccountManager: CreateAccountManagerDto) {
    return this._AccountManagerService.create(AccountManager);
  }

  @Patch()
  @ApiResponse({
    description: 'AccountManager updated information',
    isArray: false,
    type: ResourceAccountManagerDto,
  })
  update(@Body() AccountManager: UpdateAccountManagerDto) {
    return this._AccountManagerService.update(AccountManager);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceAccountManagerDto,
  })
  delete(@Param('id') id: string) {
    return this._AccountManagerService.delete(id);
  }
}
