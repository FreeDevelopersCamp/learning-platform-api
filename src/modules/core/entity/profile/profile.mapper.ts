import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Profile } from './Profile.schema';
import { ProfileDto } from '../../dto/profile/profile';
import { ResourceProfileDto } from '../../dto/profile/resource.profile';
import { CreateProfileDto } from '../../dto/profile/create.profile';
import { UpdateProfileDto } from '../../dto/profile/update.profile';
import { Types } from 'mongoose';

export class ProfileProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
      }
    
      override get profile() {
        return (mapper) => {
          createMap(mapper, ProfileDto, Profile);
          createMap(mapper, Profile, ProfileDto);

          createMap(
            mapper,
            ResourceProfileDto,
            Profile,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => new Types.ObjectId(src._id)),
            ),
          );
          createMap(
            mapper,
            Profile,
            ResourceProfileDto,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => src._id.toString()),
            ),
          );

          createMap(mapper, ResourceProfileDto, ProfileDto);
          createMap(mapper, ProfileDto, ResourceProfileDto);
    
          createMap(mapper, ResourceProfileDto, CreateProfileDto);
          createMap(mapper, CreateProfileDto, ResourceProfileDto);
    
          createMap(mapper, ResourceProfileDto, UpdateProfileDto);
          createMap(mapper, UpdateProfileDto, ResourceProfileDto);
        };
      }
}
