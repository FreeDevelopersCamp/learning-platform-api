import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Student } from './Student.schema';
import { StudentDto } from '../../dto/student/student';
import { ResourceStudentDto } from '../../dto/student/resource.student';
import { CreateStudentDto } from '../../dto/student/create.student';
import { UpdateStudentDto } from '../../dto/student/update.student';
import { Types } from 'mongoose';

export class StudentProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
      }
    
      override get profile() {
        return (mapper) => {
          createMap(mapper, StudentDto, Student);
          createMap(mapper, Student, StudentDto);

          createMap(
            mapper,
            ResourceStudentDto,
            Student,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => new Types.ObjectId(src._id)),
            ),
          );
          createMap(
            mapper,
            Student,
            ResourceStudentDto,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => src._id.toString()),
            ),
          );

          createMap(mapper, ResourceStudentDto, StudentDto);
          createMap(mapper, StudentDto, ResourceStudentDto);
    
          createMap(mapper, ResourceStudentDto, CreateStudentDto);
          createMap(mapper, CreateStudentDto, ResourceStudentDto);
    
          createMap(mapper, ResourceStudentDto, UpdateStudentDto);
          createMap(mapper, UpdateStudentDto, ResourceStudentDto);
        };
      }
}
