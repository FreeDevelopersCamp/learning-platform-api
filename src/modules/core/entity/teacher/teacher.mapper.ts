import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Teacher } from './Teacher.schema';
import { TeacherDto } from '../../dto/teacher/teacher';
import { ResourceTeacherDto } from '../../dto/teacher/resource.teacher';
import { CreateTeacherDto } from '../../dto/teacher/create.teacher';
import { UpdateTeacherDto } from '../../dto/teacher/update.teacher';
import { Types } from 'mongoose';

export class TeacherProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, TeacherDto, Teacher);
      createMap(mapper, Teacher, TeacherDto);

      createMap(
        mapper,
        ResourceTeacherDto,
        Teacher,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
      );
      createMap(
        mapper,
        Teacher,
        ResourceTeacherDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
      );

      createMap(mapper, ResourceTeacherDto, TeacherDto);
      createMap(mapper, TeacherDto, ResourceTeacherDto);

      createMap(mapper, ResourceTeacherDto, CreateTeacherDto);
      createMap(mapper, CreateTeacherDto, ResourceTeacherDto);

      createMap(mapper, ResourceTeacherDto, UpdateTeacherDto);
      createMap(mapper, UpdateTeacherDto, ResourceTeacherDto);
    };
  }
}
