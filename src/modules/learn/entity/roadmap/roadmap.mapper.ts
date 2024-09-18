import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Roadmap } from './Roadmap.schema';
import { RoadmapDto } from '../../dto/roadmap/roadmap';
import { ResourceRoadmapDto } from '../../dto/roadmap/resource.roadmap';
import { CreateRoadmapDto } from '../../dto/roadmap/create.roadmap';
import { UpdateRoadmapDto } from '../../dto/roadmap/update.roadmap';
import { Types } from 'mongoose';

export class RoadmapProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, RoadmapDto, Roadmap);
      createMap(mapper, Roadmap, RoadmapDto);

      createMap(
        mapper,
        ResourceRoadmapDto,
        Roadmap,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
      );
      createMap(
        mapper,
        Roadmap,
        ResourceRoadmapDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
      );

      createMap(mapper, ResourceRoadmapDto, RoadmapDto);
      createMap(mapper, RoadmapDto, ResourceRoadmapDto);

      createMap(mapper, ResourceRoadmapDto, CreateRoadmapDto);
      createMap(mapper, CreateRoadmapDto, ResourceRoadmapDto);

      createMap(mapper, ResourceRoadmapDto, UpdateRoadmapDto);
      createMap(mapper, UpdateRoadmapDto, ResourceRoadmapDto);
    };
  }
}
