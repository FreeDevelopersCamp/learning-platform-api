import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Tutorial } from './Tutorial.schema';
import { TutorialDto } from '../../dto/tutorial/tutorial';
import { ResourceTutorialDto } from '../../dto/tutorial/resource.tutorial';
import { CreateTutorialDto } from '../../dto/tutorial/create.tutorial';
import { UpdateTutorialDto } from '../../dto/tutorial/update.tutorial';
import { Types } from 'mongoose';

export class TutorialProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, TutorialDto, Tutorial);
      createMap(mapper, Tutorial, TutorialDto);

      createMap(
        mapper,
        ResourceTutorialDto,
        Tutorial,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
      );
      createMap(
        mapper,
        Tutorial,
        ResourceTutorialDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
      );

      createMap(mapper, ResourceTutorialDto, TutorialDto);
      createMap(mapper, TutorialDto, ResourceTutorialDto);

      createMap(mapper, ResourceTutorialDto, CreateTutorialDto);
      createMap(mapper, CreateTutorialDto, ResourceTutorialDto);

      createMap(mapper, ResourceTutorialDto, UpdateTutorialDto);
      createMap(mapper, UpdateTutorialDto, ResourceTutorialDto);
    };
  }
}
