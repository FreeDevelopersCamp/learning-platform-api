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
import { ProfileService } from '../../services/profile/profile.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateProfileDto } from '../../dto/profile/create.profile';
import { UpdateProfileDto } from '../../dto/profile/update.profile';
import { ResourceProfileDto } from '../../dto/profile/resource.profile';

@ApiBearerAuth('authorization')
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly _profileService: ProfileService) {}

  @Get()
  @ApiResponse({
    description: 'List of profile',
    isArray: true,
    type: ResourceProfileDto,
  })
  list() {
    return this._profileService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'profile information',
    isArray: false,
    type: ResourceProfileDto,
  })
  getById(@Param('id') id: string) {
    return this._profileService.getById(id);
  }

  @Post()
  @ApiResponse({
    description: 'profile created information',
    isArray: false,
    type: ResourceProfileDto,
  })
  create(@Body() profile: CreateProfileDto) {
    return this._profileService.create(profile);
  }

  @Patch()
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'profile updated information',
    isArray: false,
    type: ResourceProfileDto,
  })
  update(@Body() profile: UpdateProfileDto) {
    return this._profileService.update(profile);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceProfileDto,
  })
  delete(@Param('id') id: string) {
    return this._profileService.delete(id);
  }
}
