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
import { NotificationService } from '../../services/notification/notification.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
import { CreateNotificationDto } from '../../dto/notification/create.notification';
import { UpdateNotificationDto } from '../../dto/notification/update.notification';
import { ResourceNotificationDto } from '../../dto/notification/resource.notification';

@ApiBearerAuth('authorization')
@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly _notificationService: NotificationService) {}

  @Get()
  @ApiResponse({
    description: 'List of notification',
    isArray: true,
    type: ResourceNotificationDto,
  })
  list() {
    return this._notificationService.list();
  }

  @Get('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'notification information',
    isArray: false,
    type: ResourceNotificationDto,
  })
  getById(@Param('id') id: string) {
    return this._notificationService.getById(id);
  }

  @Post()
  @UsePipes(new SchemaValidation())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'notification created information',
    isArray: false,
    type: ResourceNotificationDto,
  })
  create(@Body() notification: CreateNotificationDto) {
    return this._notificationService.create(notification);
  }

  @Patch()
  @UsePipes(new ObjectIdValidationPipe(), new SchemaValidation())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'notification updated information',
    isArray: false,
    type: ResourceNotificationDto,
  })
  update(@Body() notification: UpdateNotificationDto) {
    return this._notificationService.update(notification);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceNotificationDto,
  })
  delete(@Param('id') id: string) {
    return this._notificationService.delete(id);
  }
}
