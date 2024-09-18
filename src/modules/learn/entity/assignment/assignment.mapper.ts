import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Assignment } from './Assignment.schema';
import { AssignmentDto } from '../../dto/assignment/assignment';
import { ResourceAssignmentDto } from '../../dto/assignment/resource.assignment';
import { CreateAssignmentDto } from '../../dto/assignment/create.assignment';
import { UpdateAssignmentDto } from '../../dto/assignment/update.assignment';
import { Types } from 'mongoose';

export class AssignmentProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, AssignmentDto, Assignment);
      createMap(mapper, Assignment, AssignmentDto);

      createMap(
        mapper,
        ResourceAssignmentDto,
        Assignment,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
      );
      createMap(
        mapper,
        Assignment,
        ResourceAssignmentDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
      );

      createMap(mapper, ResourceAssignmentDto, AssignmentDto);
      createMap(mapper, AssignmentDto, ResourceAssignmentDto);

      createMap(mapper, ResourceAssignmentDto, CreateAssignmentDto);
      createMap(mapper, CreateAssignmentDto, ResourceAssignmentDto);

      createMap(mapper, ResourceAssignmentDto, UpdateAssignmentDto);
      createMap(mapper, UpdateAssignmentDto, ResourceAssignmentDto);
    };
  }
}
