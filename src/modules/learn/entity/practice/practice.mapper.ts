import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
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
          );
          createMap(
            mapper,
            Practice,
            ResourcePracticeDto,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => src._id.toString()),
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
