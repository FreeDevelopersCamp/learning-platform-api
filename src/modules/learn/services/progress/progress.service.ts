import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import {
  CurrentProject,
  Progress,
} from '../../entity/progress/progress.schema';
import { ResourceProgressDto } from '../../dto/progress/resource.progress';
import { CreateProgressDto } from '../../dto/progress/create.progress';
import {
  Bookmarks,
  UpdateProgressDto,
} from '../../dto/progress/update.progress';
import { UserService } from 'src/modules/core/services/user/user.service';
import {
  CurrentProgress,
  CurrentProjectDto,
} from '../../dto/progress/progress';
import { ProjectService } from '../project/project.service';

@Injectable()
export class ProgressService {
  private readonly _repo: IMongoRepository<Progress>;

  constructor(
    @Inject('PROGRESS_MODEL') private _progressModel: Model<Progress>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private readonly _projectService: ProjectService,
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

  async getByUserId(id: string): Promise<ResourceProgressDto> {
    let entity: Progress;

    try {
      const progresses = await this._repo.findAll();
      const progress = progresses?.find((item) => item.userId === id);
      entity = await this._repo.findOne(progress?._id.toString());
    } catch (Exception) {
      const createdEntity = new CreateProgressDto();
      createdEntity.xp = 0;
      createdEntity.userId = id;
      return await this.create(createdEntity);
    }

    return this.toDto(entity);
  }

  async create(dto: CreateProgressDto): Promise<ResourceProgressDto> {
    const entity = await this._repo.create(new this._progressModel(dto));
    return await this.toDto(entity);
  }

  async update(dto: UpdateProgressDto): Promise<ResourceProgressDto> {
    let entity;

    try {
      entity = await this._repo.findOne(dto._id);
    } catch (Exception) {
      const createdEntity = new CreateProgressDto();
      createdEntity.xp = dto.xp;
      createdEntity.spentTime = dto.spentTime;
      createdEntity.userId = dto.userId;
      createdEntity.BookmarksIds = dto.BookmarksIds?.map((item) => {
        const bookmarks = new Bookmarks();
        bookmarks.itemId = item.itemId.toString();
        bookmarks.type = item.type;
        return bookmarks;
      });
      createdEntity.currentRoadmapsIds = dto.currentRoadmapsIds?.map((item) => {
        const progress = new CurrentProgress();
        progress.itemId = item.itemId.toString();
        progress.progress = item.progress;
        return progress;
      });
      createdEntity.currentCoursesIds = dto.currentCoursesIds?.map((item) => {
        const progress = new CurrentProgress();
        progress.itemId = item.itemId.toString();
        progress.progress = item.progress;
        return progress;
      });
      createdEntity.currentProjectsIds = await Promise.all(
        dto?.currentProjectsIds?.map((current) => {
          const currentProject = new CurrentProject();
          currentProject.id = new Types.ObjectId(current.id);
          currentProject.status = current?.status || '0';
          currentProject.url = current?.url || '';
          currentProject.review = current.review || '';
          return currentProject;
        }),
      );
      createdEntity.completedRoadmapsIds = dto.completedRoadmapsIds;
      createdEntity.completedCoursesIds = dto.completedCoursesIds;
      createdEntity.completedProjectsIds = dto.completedProjectsIds;
      createdEntity.completedPracticesIds = dto.completedPracticesIds;

      return await this.create(createdEntity);
    }

    if (dto.BookmarksIds.length > 0)
      entity.BookmarksIds = dto.BookmarksIds?.map((item) => {
        const bookmarks = new Bookmarks();
        bookmarks.itemId = item.itemId.toString();
        bookmarks.type = item.type;
        return bookmarks;
      });

    entity.currentRoadmapsIds = dto.currentRoadmapsIds?.map((item) => {
      const progress = new CurrentProgress();
      progress.itemId = item.itemId.toString();
      progress.progress = item.progress || 0;
      return progress;
    });

    entity.currentCoursesIds = dto.currentCoursesIds?.map((item) => {
      const progress = new CurrentProgress();
      progress.itemId = item.itemId.toString();
      progress.progress = item.progress || 0;
      return progress;
    });

    entity.currentProjectsIds = dto?.currentProjectsIds?.map((current) => {
      const currentProject = new CurrentProject();
      currentProject.id = new Types.ObjectId(current.id);
      currentProject.status = current?.status || '0';
      currentProject.url = current?.url || '';
      currentProject.review = current?.review || '';
      return currentProject;
    });

    entity.completedRoadmapsIds = dto.completedRoadmapsIds?.map(
      (id) => new Types.ObjectId(id),
    );

    entity.completedCoursesIds = dto.completedCoursesIds?.map(
      (id) => new Types.ObjectId(id),
    );

    entity.completedProjectsIds = dto.completedProjectsIds?.map(
      (id) => new Types.ObjectId(id),
    );

    entity.completedPracticesIds = dto.completedPracticesIds?.map(
      (id) => new Types.ObjectId(id),
    );

    entity.xp = dto.xp;
    entity.spentTime = dto.spentTime;
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
    entityDto.spentTime = entity.spentTime;
    entityDto.user = await this._userService.getById(entity.userId);

    entityDto.BookmarksIds = entity.BookmarksIds?.map((item) => {
      const bookmarks = new Bookmarks();
      bookmarks.itemId = item.itemId.toString();
      bookmarks.type = item.type;
      return bookmarks;
    });

    entityDto.currentRoadmapsIds = entity.currentRoadmapsIds?.map((item) => {
      const progress = new CurrentProgress();
      progress.itemId = item.itemId.toString();
      progress.progress = item.progress;
      return progress;
    });

    entityDto.currentCoursesIds = entity.currentCoursesIds?.map((item) => {
      const progress = new CurrentProgress();
      progress.itemId = item.itemId.toString();
      progress.progress = item.progress;
      return progress;
    });

    entityDto.currentProjects = await Promise.all(
      entity?.currentProjectsIds?.map(async (current) => {
        const dto = new CurrentProjectDto();
        dto.status = current.status;
        dto.url = current.url;
        dto.review = current.review;
        dto.project = await this._projectService.getById(current.id.toString());
        return dto;
      }),
    );

    entityDto.completedRoadmapsIds = entity.completedRoadmapsIds?.map((id) =>
      id.toString(),
    );

    entityDto.completedCoursesIds = entity.completedCoursesIds?.map((id) =>
      id.toString(),
    );

    entityDto.completedProjectsIds = entity.completedProjectsIds?.map((id) =>
      id.toString(),
    );

    entityDto.completedPracticesIds = entity.completedPracticesIds?.map((id) =>
      id.toString(),
    );

    return entityDto;
  }
}
