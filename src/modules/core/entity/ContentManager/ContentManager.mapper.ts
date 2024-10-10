import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { ContentManager } from './ContentManager.schema';
import { ContentManagerDto } from '../../dto/ContentManager/ContentManager';
import { ResourceContentManagerDto } from '../../dto/ContentManager/resource.ContentManager';
import { CreateContentManagerDto } from '../../dto/ContentManager/create.ContentManager';
import { UpdateContentManagerDto } from '../../dto/ContentManager/update.ContentManager';
import { Types } from 'mongoose';

export class ContentManagerProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, ContentManagerDto, ContentManager);
      createMap(mapper, ContentManager, ContentManagerDto);

      createMap(
        mapper,
        ResourceContentManagerDto,
        ContentManager,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
      );
      createMap(
        mapper,
        ContentManager,
        ResourceContentManagerDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
      );

      createMap(mapper, ResourceContentManagerDto, ContentManagerDto);
      createMap(mapper, ContentManagerDto, ResourceContentManagerDto);

      createMap(mapper, ResourceContentManagerDto, CreateContentManagerDto);
      createMap(mapper, CreateContentManagerDto, ResourceContentManagerDto);

      createMap(mapper, ResourceContentManagerDto, UpdateContentManagerDto);
      createMap(mapper, UpdateContentManagerDto, ResourceContentManagerDto);
    };
  }
}
