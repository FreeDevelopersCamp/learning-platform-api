import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Progress } from '../../entity/progress/progress.schema';
import { ResourceProgressDto } from '../../dto/progress/resource.progress';
import { CreateProgressDto } from '../../dto/progress/create.progress';
import { UpdateProgressDto } from '../../dto/progress/update.progress';
import { UserService } from 'src/modules/core/services/user/user.service';
import { RoadmapService } from '../roadmap/roadmap.service';
import { CourseService } from '../course/course.service';
import { PracticeService } from '../practice/practice.service';
import { ProjectService } from '../project/project.service';

@Injectable()
export class ProgressService {
  private readonly _repo: IMongoRepository<Progress>;

  constructor(
    @Inject('PROGRESS_MODEL') private _progressModel: Model<Progress>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private readonly _roadmapService: RoadmapService,
    private readonly _courseService: CourseService,
    private readonly _practiceService: PracticeService,
    private readonly _projectService: ProjectService,
    // private readonly _assessmentService: AssessmentService,
    // private readonly _tutorialService: TutorialService,
    // private readonly _certificationService: CertificationService,
  ) {
    this._repo = new MongoRepository<Progress>(_progressModel);
  }

  async list(): Promise<ResourceProgressDto[]> {
    const entities = await this._repo.findAll();

    return await Promise.all(
      entities.map(async (entity) => await this.toDto(entity)),
    );
  }

  async getById(id: string): Promise<ResourceProgressDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Progress,
      ResourceProgressDto,
    );
  }

  async create(dto: CreateProgressDto): Promise<ResourceProgressDto> {
    const entity = await this._repo.create(new this._progressModel(dto));
    return await this.toDto(entity);
  }

  async update(dto: UpdateProgressDto): Promise<ResourceProgressDto> {
    // const entity = await this._repo.update(new this._progressModel(dto));

    const entity = await this._repo.findOne(dto._id);

    if (!entity) {
      const createdEntity = new CreateProgressDto();
      createdEntity.xp = dto.xp;
      createdEntity.userId = dto.userId;
      createdEntity.currentRoadmapsIds = dto.currentRoadmapsIds;
      createdEntity.currentCoursesIds = dto.currentCoursesIds;
      createdEntity.currentProjectsIds = dto.currentProjectsIds;
      createdEntity.completedRoadmapsIds = dto.completedRoadmapsIds;
      createdEntity.completedCoursesIds = dto.completedCoursesIds;
      createdEntity.completedProjectsIds = dto.completedProjectsIds;
      createdEntity.completedPracticesIds = dto.completedPracticesIds;

      return await this.create(createdEntity);
    }

    if (dto.currentRoadmapsIds.length > 0) {
      entity.currentRoadmapsIds = dto.currentRoadmapsIds.map(
        (id) => new Types.ObjectId(id),
      );
    }
    if (dto.currentCoursesIds.length > 0) {
      entity.currentCoursesIds = dto.currentCoursesIds.map(
        (id) => new Types.ObjectId(id),
      );
    }
    if (dto.currentProjectsIds.length > 0) {
      entity.currentProjectsIds = dto.currentProjectsIds.map(
        (id) => new Types.ObjectId(id),
      );
    }
    if (dto.completedRoadmapsIds.length > 0) {
      entity.completedRoadmapsIds = dto.completedRoadmapsIds.map(
        (id) => new Types.ObjectId(id),
      );
    }
    if (dto.completedCoursesIds.length > 0) {
      entity.completedCoursesIds = dto.completedCoursesIds.map(
        (id) => new Types.ObjectId(id),
      );
    }
    if (dto.completedProjectsIds.length > 0) {
      entity.completedProjectsIds = dto.completedProjectsIds.map(
        (id) => new Types.ObjectId(id),
      );
    }
    if (dto.completedPracticesIds.length > 0) {
      entity.completedPracticesIds = dto.completedPracticesIds.map(
        (id) => new Types.ObjectId(id),
      );
    }
    entity.xp = dto.xp;
    entity.userId = dto.userId;

    return await this.toDto(
      await this._repo.update(new this._progressModel(entity)),
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }

  private async toDto(entity: Progress): Promise<ResourceProgressDto> {
    const entityDto = new ResourceProgressDto();
    entityDto._id = entity._id.toString();
    entityDto.xp = entity.xp;

    entityDto.user = await this._userService.getById(entity.userId);

    entityDto.currentRoadmaps = await Promise.all(
      entity.currentRoadmapsIds.map(async (id) => {
        return await this._roadmapService.getById(id.toString());
      }),
    );

    entityDto.currentCourses = await Promise.all(
      entity.currentCoursesIds.map(async (id) => {
        return await this._courseService.getById(id.toString());
      }),
    );

    entityDto.currentProjects = await Promise.all(
      entity.currentProjectsIds.map(async (id) => {
        return await this._projectService.getById(id.toString());
      }),
    );

    entityDto.completedRoadmaps = await Promise.all(
      entity.completedRoadmapsIds.map(async (id) => {
        return await this._roadmapService.getById(id.toString());
      }),
    );

    entityDto.completedCourses = await Promise.all(
      entity.completedCoursesIds.map(async (id) => {
        return await this._courseService.getById(id.toString());
      }),
    );

    entityDto.completedProjects = await Promise.all(
      entity.completedProjectsIds.map(async (id) => {
        return await this._projectService.getById(id.toString());
      }),
    );

    entityDto.completedPractices = await Promise.all(
      entity.completedPracticesIds.map(async (id) => {
        return await this._practiceService.getById(id.toString());
      }),
    );

    return entityDto;
  }
}
