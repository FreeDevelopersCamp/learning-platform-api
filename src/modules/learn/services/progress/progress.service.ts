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
import { CurrentProgress } from '../../dto/progress/progress';
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

  async update(dto: UpdateProgressDto, forLogin): Promise<ResourceProgressDto> {
    let entity = new UpdateProgressDto();
    let resourceDto: ResourceProgressDto;
    try {
      resourceDto = await this.getByUserId(dto.userId);
    } catch (Exception) {
      const createdEntity = new CreateProgressDto();
      createdEntity.userId = dto.userId;
      return await this.create(createdEntity);
    }

    if (forLogin) return null;

    entity._id = resourceDto._id;
    entity.BookmarksIds = resourceDto.BookmarksIds;
    entity.xp = resourceDto.xp;
    entity.userId = resourceDto.user._id;
    entity.spentTime = resourceDto.spentTime;
    entity.currentRoadmapsIds = resourceDto.currentRoadmapsIds;
    entity.currentCoursesIds = resourceDto.currentCoursesIds;
    entity.currentProjectsIds = resourceDto.currentProjectsIds;

    if (dto?.BookmarksIds?.length > 0)
      entity.BookmarksIds = dto.BookmarksIds?.map((item) => {
        const bookmarks = new Bookmarks();
        bookmarks.itemId = item.itemId.toString();
        bookmarks.type = item.type;
        return bookmarks;
      });

    if (dto?.currentRoadmapsIds?.length)
      entity.currentRoadmapsIds = dto.currentRoadmapsIds?.map((item) => {
        const progress = new CurrentProgress();
        progress.itemId = item.itemId.toString();
        progress.progress = item.progress || 0;
        return progress;
      });

    if (dto?.currentCoursesIds?.length)
      entity.currentCoursesIds = dto.currentCoursesIds?.map((item) => {
        const progress = new CurrentProgress();
        progress.itemId = item.itemId.toString();
        progress.progress = item.progress || 0;
        return progress;
      });

    if (dto?.currentProjectsIds?.length)
      entity.currentProjectsIds = dto.currentProjectsIds;

    if (dto?.completedRoadmapsIds?.length)
      entity.completedRoadmapsIds = dto.completedRoadmapsIds;

    if (dto?.completedCoursesIds?.length)
      entity.completedCoursesIds = dto.completedCoursesIds;

    if (dto?.completedProjectsIds?.length)
      entity.completedProjectsIds = dto.completedProjectsIds;

    if (dto?.completedPracticesIds?.length)
      entity.completedPracticesIds = dto.completedPracticesIds;

    if (dto?.xp) entity.xp = dto.xp;

    if (dto?.spentTime) entity.spentTime = dto.spentTime;

    if (dto?.userId) entity.userId = dto.userId;

    const updated = await this._repo.update(new this._progressModel(entity));
    return await this.toDto(updated);
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
    entityDto.currentProjectsIds = entity?.currentProjectsIds;

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
