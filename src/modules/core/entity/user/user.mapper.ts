import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
} from '@automapper/core';
import { Global, Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { CreateUserDto } from '../../dto/user/create.user';
import { ResourceUserDto, ForAuthUserDto } from '../../dto/user/resource.user';
import { UpdateUserDto } from '../../dto/user/update.user';
import { Types } from 'mongoose';

@Global()
@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        ResourceUserDto,
        User,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
        forMember(
          (dest) => dest.userName,
          mapFrom((src) => src.userName),
        ),
        forMember(
          (dest) => dest.roles,
          mapFrom((src) => src.roles.map((role) => role)),
        ),
        forMember((dest) => dest.policies, ignore()),
        forMember(
          (dest) => dest.personalInformation,
          mapFrom((src) => src.personalInformation),
        ),
        forMember(
          (dest) => dest.contacts,
          mapFrom((src) => src.contacts),
        ),
        forMember(
          (dest) => dest.address,
          mapFrom((src) => src.address),
        ),
      );

      createMap(
        mapper,
        User,
        ResourceUserDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
        forMember(
          (dest) => dest.userName,
          mapFrom((src) => src.userName),
        ),
        forMember(
          (dest) => dest.roles,
          mapFrom((src) => src.roles.map((role) => role)),
        ),
        forMember(
          (dest) => dest.personalInformation,
          mapFrom((src) => src.personalInformation),
        ),
        forMember(
          (dest) => dest.contacts,
          mapFrom((src) => src.contacts),
        ),
        forMember(
          (dest) => dest.address,
          mapFrom((src) => src.address),
        ),
      );

      createMap(
        mapper,
        User,
        ForAuthUserDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
        forMember(
          (dest) => dest.roles,
          mapFrom((src) => src.roles.map((role) => role)),
        ),
        forMember((dest) => dest.policies, ignore()),
        forMember(
          (dest) => dest.personalInformation,
          mapFrom((src) => src.personalInformation),
        ),
        forMember(
          (dest) => dest.userName,
          mapFrom((src) => src.userName),
        ),
      );

      createMap(
        mapper,
        CreateUserDto,
        ResourceUserDto,
        forMember(
          (dest) => dest.roles,
          mapFrom((src) => src.roles.map((role) => role)),
        ),
        forMember((dest) => dest.policies, ignore()),
        forMember(
          (dest) => dest.personalInformation,
          mapFrom((src) => src.personalInformation),
        ),
        forMember(
          (dest) => dest.contacts,
          mapFrom((src) => src.contacts),
        ),
        forMember(
          (dest) => dest.address,
          mapFrom((src) => src.address),
        ),
      );

      createMap(
        mapper,
        ResourceUserDto,
        CreateUserDto,
        forMember(
          (dest) => dest.roles,
          mapFrom((src) => src.roles.map((role) => role)),
        ),
        forMember((dest) => dest.policies, ignore()),
        forMember(
          (dest) => dest.personalInformation,
          mapFrom((src) => src.personalInformation),
        ),
        forMember(
          (dest) => dest.contacts,
          mapFrom((src) => src.contacts),
        ),
        forMember(
          (dest) => dest.address,
          mapFrom((src) => src.address),
        ),
      );

      createMap(
        mapper,
        UpdateUserDto,
        ResourceUserDto,
        forMember(
          (dest) => dest.roles,
          mapFrom((src) => src.roles.map((role) => role)),
        ),
        forMember((dest) => dest.policies, ignore()),
        forMember(
          (dest) => dest.personalInformation,
          mapFrom((src) => src.personalInformation),
        ),
        forMember(
          (dest) => dest.contacts,
          mapFrom((src) => src.contacts),
        ),
        forMember(
          (dest) => dest.address,
          mapFrom((src) => src.address),
        ),
      );

      createMap(
        mapper,
        ResourceUserDto,
        UpdateUserDto,
        forMember(
          (dest) => dest.roles,
          mapFrom((src) => src.roles.map((role) => role)),
        ),
        forMember((dest) => dest.policies, ignore()),
        forMember(
          (dest) => dest.personalInformation,
          mapFrom((src) => src.personalInformation),
        ),
        forMember(
          (dest) => dest.contacts,
          mapFrom((src) => src.contacts),
        ),
        forMember(
          (dest) => dest.address,
          mapFrom((src) => src.address),
        ),
      );
    };
  }
}
