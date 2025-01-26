import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Message } from '../../entity/message/message.schema';
import { ResourceMessageDto } from '../../dto/message/resource.message';
import { UpdateMessageDto } from '../../dto/message/update.message';

@Injectable()
export class MessageService {
  private readonly _repo: IMongoRepository<Message>;

  constructor(
    @Inject('MESSAGE_MODEL') private _messageModel: Model<Message>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Message>(_messageModel);
  }

  async getById(id1: string, id2: string): Promise<ResourceMessageDto[]> {
    const messages = (await this._repo.findAll()).filter(
      (message) =>
        (message.senderId === id1 && message.receiverId === id2) ||
        (message.receiverId === id1 && message.senderId === id2),
    );

    messages.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );

    return messages.map((message) => ({
      _id: message._id.toString(),
      senderId: message.senderId,
      receiverId: message.receiverId,
      content: message.content,
      timestamp: message.timestamp,
    }));
  }

  async createMessage(dto: {
    senderId: string;
    receiverId: string;
    content: string;
  }): Promise<ResourceMessageDto> {
    const created = await this._repo.create(
      new this._messageModel({ ...dto, timestamp: new Date() }),
    );

    return this.toDto(created);
  }

  async update(dto: UpdateMessageDto): Promise<ResourceMessageDto> {
    return this._mapper.map(
      await this._repo.update(new this._messageModel(dto)),
      Message,
      ResourceMessageDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }

  private toDto(entity: Message): ResourceMessageDto {
    const dto = new ResourceMessageDto();

    dto._id = entity._id.toString();
    dto.senderId = entity.senderId;
    dto.receiverId = entity.receiverId;
    dto.content = entity.content;
    dto.timestamp = entity.timestamp;
    dto.seen = entity?.seen || false;

    return dto;
  }
}
