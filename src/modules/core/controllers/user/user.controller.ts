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
import { UserService } from '../../services/user/user.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiExcludeEndpoint,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateUserDto } from '../../dto/user/create.user';
import { UpdateUserDto } from '../../dto/user/update.user';
import { ResourceUserDto } from '../../dto/user/resource.user';
// import { AuthGuard } from 'src/modules/authentication/guards/auth/auth.guard';
// import { RolesGuard } from 'src/modules/authentication/guards/roles/roles.guard';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';
// import { AllowRoles } from 'src/modules/authentication/guards/_constants/roles.constants';
// import { Roles } from 'src/modules/authentication/guards/roles/decorator/roles.decorator';

@ApiBearerAuth('authorization')
@ApiTags('user')
@Controller('user')
// @UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  // @Roles([AllowRoles.admin])
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
    description: 'List of user',
    isArray: true,
    type: ResourceUserDto,
  })
  list() {
    return this._userService.list();
  }

  @Get('/:id')
  // @Roles([AllowRoles.admin])
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'user information',
    isArray: false,
    type: ResourceUserDto,
  })
  getById(@Param('id') id: string) {
    return this._userService.getById(id);
  }

  @Get('/userId/:userName')
  @ApiResponse({
    description: 'user information',
    isArray: false,
    type: ResourceUserDto,
  })
  getByUserName(@Param('userName') userName: string) {
    return this._userService.getByUserName(userName, true);
  }

  @Post()
  @ApiExcludeEndpoint()
  @ApiResponse({
    description: 'user created information',
    isArray: false,
    type: ResourceUserDto,
  })
  create(@Body() user: CreateUserDto) {
    return this._userService.create(user);
  }

  @Patch()
  @ApiExcludeEndpoint()
  @ApiResponse({
    description: 'user updated information',
    isArray: false,
    type: ResourceUserDto,
  })
  update(@Body() user: UpdateUserDto) {
    return this._userService.update(user);
  }

  @Delete('/:id')
  @ApiExcludeEndpoint()
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
