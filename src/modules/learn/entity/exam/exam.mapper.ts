import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Exam } from './Exam.schema';
import { ExamDto } from '../../dto/exam/exam';
import { ResourceExamDto } from '../../dto/exam/resource.exam';
import { CreateExamDto } from '../../dto/exam/create.exam';
import { UpdateExamDto } from '../../dto/exam/update.exam';
import { Types } from 'mongoose';

export class ExamProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
      }
    
      override get profile() {
        return (mapper) => {
          createMap(mapper, ExamDto, Exam);
          createMap(mapper, Exam, ExamDto);

          createMap(
            mapper,
            ResourceExamDto,
            Exam,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => new Types.ObjectId(src._id)),
            ),
          );
          createMap(
            mapper,
            Exam,
            ResourceExamDto,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => src._id.toString()),
            ),
          );

          createMap(mapper, ResourceExamDto, ExamDto);
          createMap(mapper, ExamDto, ResourceExamDto);
    
          createMap(mapper, ResourceExamDto, CreateExamDto);
          createMap(mapper, CreateExamDto, ResourceExamDto);
    
          createMap(mapper, ResourceExamDto, UpdateExamDto);
          createMap(mapper, UpdateExamDto, ResourceExamDto);
        };
      }
}
