import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Learner } from './Learner.schema';
import { LearnerDto } from '../../dto/learner/learner';
import { ResourceLearnerDto } from '../../dto/learner/resource.learner';
import { CreateLearnerDto } from '../../dto/learner/create.learner';
import { UpdateLearnerDto } from '../../dto/learner/update.learner';
import { Types } from 'mongoose';

export class LearnerProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, LearnerDto, Learner);
      createMap(mapper, Learner, LearnerDto);

      createMap(
        mapper,
        ResourceLearnerDto,
        Learner,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
      );
      createMap(
        mapper,
        Learner,
        ResourceLearnerDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
      );

      createMap(mapper, ResourceLearnerDto, LearnerDto);
      createMap(mapper, LearnerDto, ResourceLearnerDto);

      createMap(mapper, ResourceLearnerDto, CreateLearnerDto);
      createMap(mapper, CreateLearnerDto, ResourceLearnerDto);

      createMap(mapper, ResourceLearnerDto, UpdateLearnerDto);
      createMap(mapper, UpdateLearnerDto, ResourceLearnerDto);
    };
  }
}
