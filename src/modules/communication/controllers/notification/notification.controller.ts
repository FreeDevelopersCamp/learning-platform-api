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

  @Get('user/:userId')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'notification information',
    isArray: false,
    type: ResourceNotificationDto,
  })
  getUserNotifications(@Param('userId') userId: string) {
    return this._notificationService.getUserNotifications(userId);
  }

  @Post()
  @ApiResponse({
    description: 'notification created information',
    isArray: false,
    type: ResourceNotificationDto,
  })
  create(@Body() notification: CreateNotificationDto) {
    return this._notificationService.create(notification);
  }

  @Patch('/:id')
  @ApiResponse({
    description: 'notification updated information',
    isArray: false,
    type: ResourceNotificationDto,
  })
  update(@Param('id') id: string, @Body() body: UpdateNotificationDto) {
    return this._notificationService.update(id, body);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceNotificationDto,
  })
  delete(@Param('id') id: string) {
    return this._notificationService.delete(id);
  }

  @Post('send')
  async sendNotification(
    @Body() body: { token: string; title: string; message: string },
  ) {
    const { token, title, message } = body;
    await this._notificationService.sendNotification(token, title, message);
    return { success: true };
  }
}
