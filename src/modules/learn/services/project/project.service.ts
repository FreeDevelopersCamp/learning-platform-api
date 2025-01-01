import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Project } from '../../entity/project/project.schema';
import { ResourceProjectDto } from '../../dto/project/resource.project';
import { CreateProjectDto } from '../../dto/project/create.project';
import { UpdateProjectDto } from '../../dto/project/update.project';
import { UserService } from 'src/modules/core/services/user/user.service';
import { AdminService } from 'src/modules/core/services/admin/admin.service';
import { ContentManagerService } from 'src/modules/core/services/ContentManager/ContentManager.service';
import { InstructorService } from 'src/modules/core/services/instructor/instructor.service';
import { UserRequested } from 'src/infra/system/system.constant';
import { ProjectException } from 'src/utils/exception';
import { OwnerService } from 'src/modules/core/services/owner/owner.service';
import { ManagerService } from 'src/modules/core/services/manager/manager.service';
import { AccountManagerService } from 'src/modules/core/services/AccountManager/AccountManager.service';

@Injectable()
export class ProjectService {
  private readonly _repo: IMongoRepository<Project>;

  constructor(
    @Inject('PROJECT_MODEL') private _projectModel: Model<Project>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private readonly _adminService: AdminService,
    private readonly _contentManagerService: ContentManagerService,
    private readonly _instructorService: InstructorService,
  ) {
    this._repo = new MongoRepository<Project>(_projectModel);
  }

  async list(): Promise<ResourceProjectDto[]> {
    const entities = await this._repo.findAll();
    return Promise.all(
      entities.map(async (entity) => await this.toDto(entity)),
    );
  }

  async listByInstructor(id: string): Promise<ResourceProjectDto[]> {
    const instructor = await this._instructorService.getById(id);

    return Promise.all(
      instructor.projectsIds.map(
        async (projectId) => await this.getById(projectId),
      ),
    );
  }

  async getById(id: string): Promise<ResourceProjectDto> {
    const entity = await this._repo.findOne(id);
    return await this.toDto(entity);
  }

  async create(dto: CreateProjectDto): Promise<ResourceProjectDto> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new ProjectException('You are not authorized');
    }

    const entity = await this._repo.create(new this._projectModel(dto));

    const instructor = await this._instructorService.getById(dto.instructorId);

    if (!instructor.projectsIds) {
      instructor.projectsIds = [];
    }

    instructor.projectsIds.push(entity._id.toString());
    await this._instructorService.update(instructor);

    return this.toDto(entity);
  }

  async update(dto: UpdateProjectDto): Promise<ResourceProjectDto> {
    const entity = await this._repo.findOne(dto._id);

    if (dto.category) {
      entity.category = dto.category;
    }
    if (dto.name) {
      entity.name = dto.name;
    }
    if (dto.topic) {
      entity.topic = dto.topic;
    }
    if (dto.title) {
      entity.title = dto.title;
    }
    if (dto.prerequisites) {
      entity.prerequisites = dto.prerequisites;
    }
    if (dto.status) {
      entity.status = dto.status;
    }
    if (dto.xp) {
      entity.xp = dto.xp;
    }
    if (dto.description) {
      entity.description = dto.description;
    }
    if (dto.tasks) {
      entity.tasks = dto.tasks;
    }
    if (dto.participants) {
      entity.participants = dto.participants;
    }
    return this.toDto(await this._repo.update(new this._projectModel(entity)));
  }

  async delete(id: string): Promise<boolean> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new ProjectException('You are not authorized');
    }

    const instructor = await this._instructorService.getByUserId(
      UserRequested.userId,
    );
    instructor.projectsIds = instructor.projectsIds.filter(
      (projectId) => projectId !== id,
    );
    await this._instructorService.update(instructor);
    return await this._repo.delete(id);
  }

  private async isAuthorized(userId: string): Promise<boolean> {
    const user = await this._userService.getById(userId);
    let isAdmin = false;
    let isContentManager = false;

    if (user.roles.includes('0')) {
      const admin = await this._adminService.getByUserId(userId);

      if (admin && admin.status == '2') {
        isAdmin = true;
      }
    } else if (user.roles.includes('4')) {
      const contentManager =
        await this._contentManagerService.getByUserId(userId);

      if (contentManager && contentManager.status == '2') {
        isContentManager = true;
      }
    }
    return isAdmin || isContentManager;
  }

  private async toDto(entity: Project): Promise<ResourceProjectDto> {
    const entityDto = new ResourceProjectDto();
    entityDto._id = entity._id.toString();
    entityDto.name = entity.name;
    entityDto.title = entity.title;
    entityDto.prerequisites = entity.prerequisites;
    entityDto.category = entity.category;
    entityDto.topic = entity.topic;
    entityDto.status = entity.status;
    entityDto.xp = entity.xp;
    entityDto.description = entity.description;
    entityDto.participants = entity.participants;
    entityDto.tasks = entity.tasks;

    entityDto.instructor = await this._instructorService.getById(
      entity.instructorId.toString(),
    );

    return entityDto;
  }
}
