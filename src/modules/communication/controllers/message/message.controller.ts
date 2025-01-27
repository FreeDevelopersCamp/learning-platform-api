import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { MessageService } from '../../services/message/message.service';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { UpdateMessageDto } from '../../dto/message/update.message';
import { ResourceMessageDto } from '../../dto/message/resource.message';

@ApiBearerAuth('authorization')
@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly _messageService: MessageService) {}

  @Get('/:id1/:id2')
  @ApiResponse({
    description: 'message information',
    isArray: true,
    type: ResourceMessageDto,
  })
  getById(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this._messageService.getById(id1, id2);
  }

  @Post('send')
  async sendMessage(
    @Body()
    body: {
      message: { senderId: string; receiverId: string; content: string };
    },
  ) {
    console.log('Received REST request:', body.message);
    return this._messageService.createMessage(body.message);
  }

  @Patch()
  @ApiResponse({
    description: 'message updated information',
    isArray: false,
    type: ResourceMessageDto,
  })
  update(@Body() message: UpdateMessageDto) {
    return this._messageService.update(message);
  }

  @Delete('/:id')
  @UsePipes(new ObjectIdValidationPipe())
  @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: ResourceMessageDto,
  })
  delete(@Param('id') id: string) {
    return this._messageService.delete(id);
  }
}
