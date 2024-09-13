import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { EmailService } from '../../services/email/email.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
import { CreateEmailDto } from '../../dto/email/create.email';
import { ResourceEmailDto } from '../../dto/email/resource.email';

@ApiBearerAuth('authorization')
@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private readonly _emailService: EmailService) {}

  @Get()
  @ApiResponse({
    description: 'List of email',
    isArray: true,
    type: ResourceEmailDto,
  })
  list() {
    return this._emailService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'email information',
    isArray: false,
    type: ResourceEmailDto,
  })
  getById(@Param('id') id: string) {
    return this._emailService.getById(id);
  }

  @Post()
  @UsePipes(new SchemaValidation())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'email created information',
    isArray: false,
    type: ResourceEmailDto,
  })
  create(@Body() email: CreateEmailDto) {
    return this._emailService.create(email);
  }
}
