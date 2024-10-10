import {
  Mapper,
  createMap,
  forMember,
  ignore,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Instructor } from './Instructor.schema';
import { InstructorDto } from '../../dto/instructor/instructor';
import { ResourceInstructorDto } from '../../dto/instructor/resource.instructor';
import { CreateInstructorDto } from '../../dto/instructor/create.instructor';
import { UpdateInstructorDto } from '../../dto/instructor/update.instructor';
import { Types } from 'mongoose';

export class InstructorProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, InstructorDto, Instructor);
      createMap(mapper, Instructor, InstructorDto);

      createMap(
        mapper,
        ResourceInstructorDto,
        Instructor,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
        forMember((dest) => dest.userId, ignore()),
      );
      createMap(
        mapper,
        Instructor,
        ResourceInstructorDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
        forMember((dest) => dest.user, ignore()),
      );

      createMap(mapper, ResourceInstructorDto, InstructorDto);
      createMap(mapper, InstructorDto, ResourceInstructorDto);

      createMap(mapper, ResourceInstructorDto, CreateInstructorDto);
      createMap(mapper, CreateInstructorDto, ResourceInstructorDto);

      createMap(mapper, ResourceInstructorDto, UpdateInstructorDto);
      createMap(mapper, UpdateInstructorDto, ResourceInstructorDto);
    };
  }
}
