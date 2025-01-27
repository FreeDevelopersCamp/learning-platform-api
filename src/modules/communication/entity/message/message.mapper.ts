import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Message } from './Message.schema';
import { MessageDto } from '../../dto/message/message';
import { ResourceMessageDto } from '../../dto/message/resource.message';
import { CreateMessageDto } from '../../dto/message/create.message';
import { UpdateMessageDto } from '../../dto/message/update.message';
import { Types } from 'mongoose';

export class MessageProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
      }
    
      override get profile() {
        return (mapper) => {
          createMap(mapper, MessageDto, Message);
          createMap(mapper, Message, MessageDto);

          createMap(
            mapper,
            ResourceMessageDto,
            Message,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => new Types.ObjectId(src._id)),
            ),
          );
          createMap(
            mapper,
            Message,
            ResourceMessageDto,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => src._id.toString()),
            ),
          );

          createMap(mapper, ResourceMessageDto, MessageDto);
          createMap(mapper, MessageDto, ResourceMessageDto);
    
          createMap(mapper, ResourceMessageDto, CreateMessageDto);
          createMap(mapper, CreateMessageDto, ResourceMessageDto);
    
          createMap(mapper, ResourceMessageDto, UpdateMessageDto);
          createMap(mapper, UpdateMessageDto, ResourceMessageDto);
        };
      }
}
