import {
  Mapper,
  createMap,
  forMember,
  ignore,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Owner } from './Owner.schema';
import { OwnerDto } from '../../dto/owner/owner';
import { ResourceOwnerDto } from '../../dto/owner/resource.owner';
import { CreateOwnerDto } from '../../dto/owner/create.owner';
import { UpdateOwnerDto } from '../../dto/owner/update.owner';
import { Types } from 'mongoose';

export class OwnerProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, OwnerDto, Owner);
      createMap(mapper, Owner, OwnerDto);

      createMap(
        mapper,
        ResourceOwnerDto,
        Owner,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
        forMember((dest) => dest.userId, ignore()),
      );
      createMap(
        mapper,
        Owner,
        ResourceOwnerDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
        forMember((dest) => dest.user, ignore()),
      );

      createMap(mapper, ResourceOwnerDto, OwnerDto);
      createMap(mapper, OwnerDto, ResourceOwnerDto);

      createMap(mapper, ResourceOwnerDto, CreateOwnerDto);
      createMap(mapper, CreateOwnerDto, ResourceOwnerDto);

      createMap(mapper, ResourceOwnerDto, UpdateOwnerDto);
      createMap(mapper, UpdateOwnerDto, ResourceOwnerDto);
    };
  }
}
