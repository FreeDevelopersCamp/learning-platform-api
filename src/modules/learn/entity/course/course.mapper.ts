import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Course } from './Course.schema';
import { CourseDto } from '../../dto/course/course';
import { ResourceCourseDto } from '../../dto/course/resource.course';
import { CreateCourseDto } from '../../dto/course/create.course';
import { UpdateCourseDto } from '../../dto/course/update.course';
import { Types } from 'mongoose';

export class CourseProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CourseDto, Course);
      createMap(mapper, Course, CourseDto);

      createMap(
        mapper,
        ResourceCourseDto,
        Course,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
        forMember(
          (dest) => dest.name,
          mapFrom((src) => src.name),
        ),
        forMember(
          (dest) => dest.description,
          mapFrom((src) => src.description),
        ),
        forMember(
          (dest) => dest.category,
          mapFrom((src) => src.category),
        ),
        // forMember((dest) => dest.instructorId, ignore()),
        // forMember((dest) => dest.subCoursesIds, ignore()),
        forMember(
          (dest) => dest.tips,
          mapFrom((src) => src.tips),
        ),
        forMember(
          (dest) => dest.topic,
          mapFrom((src) => src.topic),
        ),
        // forMember(
        //   (dest) => dest.resources,
        //   mapFrom((src) => src.resources),
        // ),
      );
      createMap(
        mapper,
        Course,
        ResourceCourseDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
        forMember(
          (dest) => dest.name,
          mapFrom((src) => src.name),
        ),
        forMember(
          (dest) => dest.description,
          mapFrom((src) => src.description),
        ),
        forMember(
          (dest) => dest.category,
          mapFrom((src) => src.category),
        ),
        // forMember((dest) => dest.instructor, ignore()),
        // forMember((dest) => dest.subCourses, ignore()),
        forMember(
          (dest) => dest.tips,
          mapFrom((src) => src.tips),
        ),
        forMember(
          (dest) => dest.topic,
          mapFrom((src) => src.topic),
        ),
        // forMember(
        //   (dest) => dest.resources,
        //   mapFrom((src) => src.resources),
        // ),
      );

      createMap(mapper, ResourceCourseDto, CourseDto);
      createMap(mapper, CourseDto, ResourceCourseDto);

      createMap(mapper, ResourceCourseDto, CreateCourseDto);
      createMap(mapper, CreateCourseDto, ResourceCourseDto);

      createMap(mapper, ResourceCourseDto, UpdateCourseDto);
      createMap(mapper, UpdateCourseDto, ResourceCourseDto);
    };
  }
}
