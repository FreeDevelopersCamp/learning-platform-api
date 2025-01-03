import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Learner } from '../../entity/learner/learner.schema';
import { ResourceLearnerDto } from '../../dto/learner/resource.learner';
import { CreateLearnerDto } from '../../dto/learner/create.learner';
import { UpdateLearnerDto } from '../../dto/learner/update.learner';
import { UserService } from '../user/user.service';
import { LearnerException } from 'src/utils/exception';
import { AdminService } from '../admin/admin.service';
import { OwnerService } from '../owner/owner.service';
import { ManagerService } from '../manager/manager.service';
import { AccountManagerService } from '../AccountManager/AccountManager.service';
import { ContentManagerService } from '../ContentManager/ContentManager.service';
import { InstructorService } from '../instructor/instructor.service';
import { RatingDto } from 'src/modules/learn/dto/course/update.course';
import { UserRequested } from 'src/infra/system/system.constant';
import { CourseService } from 'src/modules/learn/services/course/course.service';
import { RoadmapService } from 'src/modules/learn/services/roadmap/roadmap.service';

@Injectable()
export class LearnerService {
  private readonly _repo: IMongoRepository<Learner>;

  constructor(
    @Inject('LEARNER_MODEL') private _learnerModel: Model<Learner>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private readonly _adminService: AdminService,
    private readonly _ownerService: OwnerService,
    private readonly _managerService: ManagerService,
    private readonly _accountManagerService: AccountManagerService,
    private readonly _contentManagerService: ContentManagerService,
    private readonly _instructorService: InstructorService,
    private readonly _courseService: CourseService,
    private readonly _roadmapService: RoadmapService,
  ) {
    this._repo = new MongoRepository<Learner>(_learnerModel);
  }

  async list(): Promise<ResourceLearnerDto[]> {
    const entities = await this._repo.findAll();

    return await Promise.all(
      entities.map(async (entity) => {
        return await this.toDto(entity);
      }),
    );
  }

  async getById(id: string): Promise<ResourceLearnerDto> {
    const entity = await this._repo.findOne(id);
    return await this.toDto(entity);
  }

  async create(dto: CreateLearnerDto): Promise<ResourceLearnerDto> {
    const entity = await this._repo.create(new this._learnerModel(dto));
    return await this.toDto(entity);
  }

  async update(dto: UpdateLearnerDto): Promise<ResourceLearnerDto> {
    const entity = await this._repo.update(new this._learnerModel(dto));
    if (!entity.userId) {
      entity.userId = new Types.ObjectId(dto.user._id);
    }
    return await this.toDto(entity);
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.getById(id);

    if (entity.status == '2') {
      throw new LearnerException('You can not delete active entities');
    }

    if (entity.user.roles.length === 1) {
      await this._userService.delete(entity.user._id);
    } else {
      entity.user.roles = entity.user.roles.filter((role) => role !== '6');
      await this._userService.update(entity.user);
    }

    return await this._repo.delete(id);
  }

  async deactivate(id: string): Promise<ResourceLearnerDto> {
    const dto = await this.getById(id);

    if (dto.status == '1') {
      throw new LearnerException('This entity is still pending!');
    }

    const entity = new UpdateLearnerDto();
    entity._id = dto._id;
    entity.status = '3';
    entity.user = dto.user;
    return await this.update(entity);
  }

  async approve(id: string): Promise<ResourceLearnerDto> {
    const entity = await this.getById(id);

    if (entity.status == '2')
      throw new LearnerException('This entity is already approved!');

    entity.status = '2';
    return await this.update(entity);
  }

  async getByUserId(id: string): Promise<ResourceLearnerDto> {
    // await this.isAuthorized(UserRequested.userId);

    const entities = await this._repo.findAll();
    const entity = entities.find((entity) => entity.userId.toString() === id);

    if (!entity) {
      throw new LearnerException('Entity not found');
    }

    return await this.toDto(entity);
  }

  async addRating(dto: RatingDto) {
    const userId = UserRequested.userId;

    dto = { ...dto, userId };

    if (dto.courseId) {
      dto._id = dto.courseId;
      return await this._courseService.addRating(dto);
    }
    if (dto.roadmapId) dto._id = dto.roadmapId;
    return await this._roadmapService.addRating(dto);
  }

  private async isAuthorized(userId: string): Promise<boolean> {
    const user = await this._userService.getById(userId);
    let isAdmin = false;
    let isOwner = false;
    let isManager = false;
    let isAccountManager = false;
    let isContentManager = false;
    let isInstructor = false;
    let isLearner = false;

    if (user.roles.includes('0')) {
      const admin = await this._adminService.getByUserId(userId);

      if (admin && admin.status == '2') {
        isAdmin = true;
      }
    } else if (user.roles.includes('1')) {
      const owner = await this._ownerService.getByUserId(userId);

      if (owner && owner.status == '2') {
        isOwner = true;
      }
    } else if (user.roles.includes('2')) {
      const manager = await this._managerService.getByUserId(userId);

      if (manager && manager.status == '2') {
        isManager = true;
      }
    } else if (user.roles.includes('3')) {
      const accountManager =
        await this._accountManagerService.getByUserId(userId);

      if (accountManager && accountManager.status == '2') {
        isAccountManager = true;
      }
    } else if (user.roles.includes('4')) {
      const contentManager =
        await this._contentManagerService.getByUserId(userId);

      if (contentManager && contentManager.status == '2') {
        isContentManager = true;
      }
    } else if (user.roles.includes('5')) {
      const instructor = await this._instructorService.getByUserId(userId);

      if (instructor && instructor.status == '2') {
        isInstructor = true;
      }
    } else if (user.roles.includes('6')) {
      const learner = await this.getByUserId(userId);

      if (learner && learner.status == '2') {
        isLearner = true;
      }
    }
    return (
      isAdmin ||
      isOwner ||
      isManager ||
      isAccountManager ||
      isContentManager ||
      isInstructor ||
      isLearner
    );
  }

  private async toDto(entity: Learner): Promise<ResourceLearnerDto> {
    const dto = new ResourceLearnerDto();
    dto._id = entity._id.toString();
    dto.status = entity.status;
    dto.user = await this._userService.getById(entity.userId.toString());

    return dto;
  }
}
