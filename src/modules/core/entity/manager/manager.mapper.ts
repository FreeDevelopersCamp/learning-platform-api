import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Manager } from './Manager.schema';
import { ManagerDto } from '../../dto/manager/manager';
import { ResourceManagerDto } from '../../dto/manager/resource.manager';
import { CreateManagerDto } from '../../dto/manager/create.manager';
import { UpdateManagerDto } from '../../dto/manager/update.manager';
import { Types } from 'mongoose';

export class ManagerProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, ManagerDto, Manager);
      createMap(mapper, Manager, ManagerDto);

      createMap(
        mapper,
        ResourceManagerDto,
        Manager,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
      );
      createMap(
        mapper,
        Manager,
        ResourceManagerDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
      );

      createMap(mapper, ResourceManagerDto, ManagerDto);
      createMap(mapper, ManagerDto, ResourceManagerDto);

      createMap(mapper, ResourceManagerDto, CreateManagerDto);
      createMap(mapper, CreateManagerDto, ResourceManagerDto);

      createMap(mapper, ResourceManagerDto, UpdateManagerDto);
      createMap(mapper, UpdateManagerDto, ResourceManagerDto);
    };
  }
}
