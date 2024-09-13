import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Project } from './Project.schema';
import { ProjectDto } from '../../dto/project/project';
import { ResourceProjectDto } from '../../dto/project/resource.project';
import { CreateProjectDto } from '../../dto/project/create.project';
import { UpdateProjectDto } from '../../dto/project/update.project';
import { Types } from 'mongoose';

export class ProjectProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
      }
    
      override get profile() {
        return (mapper) => {
          createMap(mapper, ProjectDto, Project);
          createMap(mapper, Project, ProjectDto);

          createMap(
            mapper,
            ResourceProjectDto,
            Project,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => new Types.ObjectId(src._id)),
            ),
          );
          createMap(
            mapper,
            Project,
            ResourceProjectDto,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => src._id.toString()),
            ),
          );

          createMap(mapper, ResourceProjectDto, ProjectDto);
          createMap(mapper, ProjectDto, ResourceProjectDto);
    
          createMap(mapper, ResourceProjectDto, CreateProjectDto);
          createMap(mapper, CreateProjectDto, ResourceProjectDto);
    
          createMap(mapper, ResourceProjectDto, UpdateProjectDto);
          createMap(mapper, UpdateProjectDto, ResourceProjectDto);
        };
      }
}
