import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
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
          );
          createMap(
            mapper,
            Course,
            ResourceCourseDto,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => src._id.toString()),
            ),
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
