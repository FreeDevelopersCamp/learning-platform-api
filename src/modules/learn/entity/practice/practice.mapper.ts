import {
  Mapper,
  createMap,
  forMember,
  ignore,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Practice } from './Practice.schema';
import { PracticeDto } from '../../dto/practice/practice';
import { ResourcePracticeDto } from '../../dto/practice/resource.practice';
import { CreatePracticeDto } from '../../dto/practice/create.practice';
import { UpdatePracticeDto } from '../../dto/practice/update.practice';
import { Types } from 'mongoose';

export class PracticeProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, PracticeDto, Practice);
      createMap(mapper, Practice, PracticeDto);

      createMap(
        mapper,
        ResourcePracticeDto,
        Practice,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
        forMember(
          (dest) => dest.name,
          mapFrom((src) => src.name),
        ),
        forMember(
          (dest) => dest.category,
          mapFrom((src) => src.category),
        ),
        forMember(
          (dest) => dest.topic,
          mapFrom((src) => src.topic),
        ),
        forMember(
          (dest) => dest.prerequisites,
          mapFrom((src) => src.prerequisites),
        ),
        forMember(
          (dest) => dest.status,
          mapFrom((src) => src.status),
        ),
        forMember(
          (dest) => dest.duration,
          mapFrom((src) => src.duration),
        ),
        forMember(
          (dest) => dest.xp,
          mapFrom((src) => src.xp),
        ),
        forMember(
          (dest) => dest.challengesToPass,
          mapFrom((src) => src.challengesToPass),
        ),
        forMember(
          (dest) => dest.challenges,
          ignore(),
          // mapFrom((src) => src.challenges),
        ),
      );
      createMap(
        mapper,
        Practice,
        ResourcePracticeDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
        forMember(
          (dest) => dest.name,
          mapFrom((src) => src.name),
        ),
        forMember(
          (dest) => dest.category,
          mapFrom((src) => src.category),
        ),
        forMember(
          (dest) => dest.topic,
          mapFrom((src) => src.topic),
        ),
        forMember(
          (dest) => dest.prerequisites,
          mapFrom((src) => src.prerequisites),
        ),
        forMember(
          (dest) => dest.status,
          mapFrom((src) => src.status),
        ),
        forMember(
          (dest) => dest.duration,
          mapFrom((src) => src.duration),
        ),
        forMember(
          (dest) => dest.xp,
          mapFrom((src) => src.xp),
        ),
        forMember(
          (dest) => dest.challengesToPass,
          mapFrom((src) => src.challengesToPass),
        ),
        forMember(
          (dest) => dest.challenges,
          mapFrom((src) => src.challenges),
        ),
      );

      createMap(mapper, ResourcePracticeDto, PracticeDto);
      createMap(mapper, PracticeDto, ResourcePracticeDto);

      createMap(mapper, ResourcePracticeDto, CreatePracticeDto);
      createMap(mapper, CreatePracticeDto, ResourcePracticeDto);

      createMap(mapper, ResourcePracticeDto, UpdatePracticeDto);
      createMap(mapper, UpdatePracticeDto, ResourcePracticeDto);
    };
  }
}
