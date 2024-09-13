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
import { UserService } from '../../services/user/user.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
import { CreateUserDto } from '../../dto/user/create.user';
import { UpdateUserDto } from '../../dto/user/update.user';
import { ResourceUserDto } from '../../dto/user/resource.user';

@ApiBearerAuth('authorization')
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  @ApiResponse({
    description: 'List of user',
    isArray: true,
    type: ResourceUserDto,
  })
  list() {
    return this._userService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'user information',
    isArray: false,
    type: ResourceUserDto,
  })
  getById(@Param('id') id: string) {
    return this._userService.getById(id);
  }

  @Post()
  @UsePipes(new SchemaValidation())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'user created information',
    isArray: false,
    type: ResourceUserDto,
  })
  create(@Body() user: CreateUserDto) {
    return this._userService.create(user);
  }

  @Patch()
  @UsePipes(new ObjectIdValidationPipe(), new SchemaValidation())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'user updated information',
    isArray: false,
    type: ResourceUserDto,
  })
  update(@Body() user: UpdateUserDto) {
    return this._userService.update(user);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceUserDto,
  })
  delete(@Param('id') id: string) {
    return this._userService.delete(id);
  }
}
