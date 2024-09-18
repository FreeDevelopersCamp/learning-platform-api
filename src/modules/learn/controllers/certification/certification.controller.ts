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
import { CertificationService } from '../../services/certification/certification.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
import { CreateCertificationDto } from '../../dto/certification/create.certification';
import { UpdateCertificationDto } from '../../dto/certification/update.certification';
import { ResourceCertificationDto } from '../../dto/certification/resource.certification';

@ApiBearerAuth('authorization')
@ApiTags('certification')
@Controller('certification')
export class CertificationController {
  constructor(private readonly _certificationService: CertificationService) {}

  @Get()
  @ApiResponse({
    description: 'List of certification',
    isArray: true,
    type: ResourceCertificationDto,
  })
  list() {
    return this._certificationService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'certification information',
    isArray: false,
    type: ResourceCertificationDto,
  })
  getById(@Param('id') id: string) {
    return this._certificationService.getById(id);
  }

  @Post()
  @UsePipes(new SchemaValidation())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'certification created information',
    isArray: false,
    type: ResourceCertificationDto,
  })
  create(@Body() certification: CreateCertificationDto) {
    return this._certificationService.create(certification);
  }

  @Patch()
  @UsePipes(new ObjectIdValidationPipe(), new SchemaValidation())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'certification updated information',
    isArray: false,
    type: ResourceCertificationDto,
  })
  update(@Body() certification: UpdateCertificationDto) {
    return this._certificationService.update(certification);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceCertificationDto,
  })
  delete(@Param('id') id: string) {
    return this._certificationService.delete(id);
  }
}
