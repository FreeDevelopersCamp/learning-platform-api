import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
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
      );
      createMap(
        mapper,
        Owner,
        ResourceOwnerDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
      );

      createMap(mapper, ResourceOwnerDto, OwnerDto);
      createMap(mapper, OwnerDto, ResourceOwnerDto);

      createMap(mapper, ResourceOwnerDto, CreateOwnerDto);
      createMap(mapper, CreateOwnerDto, ResourceOwnerDto);

      createMap(
        mapper,
        ResourceOwnerDto,
        UpdateOwnerDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id),
        ),
        forMember(
          (dest) => dest.user,
          mapFrom((src) => src.user),
        ),
      );
      createMap(
        mapper,
        UpdateOwnerDto,
        ResourceOwnerDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id),
        ),
        forMember(
          (dest) => dest.user,
          mapFrom((src) => src.user),
        ),
      );
    };
  }
}
