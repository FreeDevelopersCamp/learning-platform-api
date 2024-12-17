import {
  Mapper,
  createMap,
  forMember,
  ignore,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Progress } from './Progress.schema';
import { ProgressDto } from '../../dto/progress/progress';
import { ResourceProgressDto } from '../../dto/progress/resource.progress';
import { CreateProgressDto } from '../../dto/progress/create.progress';
import { UpdateProgressDto } from '../../dto/progress/update.progress';
import { Types } from 'mongoose';

export class ProgressProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, ProgressDto, Progress);
      createMap(mapper, Progress, ProgressDto);

      createMap(
        mapper,
        ResourceProgressDto,
        Progress,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
        forMember((dest) => dest.userId, ignore()),
      );
      createMap(
        mapper,
        Progress,
        ResourceProgressDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
        forMember((dest) => dest.user, ignore()),
      );

      createMap(mapper, ResourceProgressDto, ProgressDto);
      createMap(mapper, ProgressDto, ResourceProgressDto);

      createMap(mapper, ResourceProgressDto, CreateProgressDto);
      createMap(mapper, CreateProgressDto, ResourceProgressDto);

      createMap(mapper, ResourceProgressDto, UpdateProgressDto);
      createMap(mapper, UpdateProgressDto, ResourceProgressDto);
    };
  }
}
