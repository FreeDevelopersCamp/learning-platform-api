import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ContentManager } from '../../entity/ContentManager/ContentManager.schema';
import { ResourceContentManagerDto } from '../../dto/ContentManager/resource.ContentManager';
import { CreateContentManagerDto } from '../../dto/ContentManager/create.ContentManager';
import { UpdateContentManagerDto } from '../../dto/ContentManager/update.ContentManager';
import { UserService } from '../user/user.service';
import { AdminService } from '../admin/admin.service';
import { OwnerService } from '../owner/owner.service';
import { ManagerService } from '../manager/manager.service';
import { ContentManagerException } from 'src/utils/exception';
import { UserRequested } from 'src/infra/system/system.constant';

@Injectable()
export class ContentManagerService {
  private readonly _repo: IMongoRepository<ContentManager>;

  constructor(
    @Inject('CONTENTMANAGER_MODEL')
    private _ContentManagerModel: Model<ContentManager>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private readonly _adminService: AdminService,
    private readonly _ownerService: OwnerService,
    private readonly _managerService: ManagerService,
  ) {
    this._repo = new MongoRepository<ContentManager>(_ContentManagerModel);
  }

  async list(): Promise<ResourceContentManagerDto[]> {
    const userId = UserRequested.userId;

    const authorized = await this.isAuthorized(userId);

    if (!authorized) {
      throw new ContentManagerException('Not Approved!');
    }

    const entities = await this._repo.findAll();

    return await Promise.all(
      entities.map(async (entity) => {
        return await this.toDto(entity);
      }),
    );
  }

  async getById(id: string): Promise<ResourceContentManagerDto> {
    await this.isAuthorized(UserRequested.userId);

    const entity = await this._repo.findOne(id);
    return await this.toDto(entity);
  }

  async create(
    dto: CreateContentManagerDto,
  ): Promise<ResourceContentManagerDto> {
    const entity = await this._repo.create(new this._ContentManagerModel(dto));
    return await this.toDto(entity);
  }

  async update(
    dto: UpdateContentManagerDto,
  ): Promise<ResourceContentManagerDto> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new ContentManagerException('You are not authorized');
    }

    const entity = await this._repo.update(new this._ContentManagerModel(dto));
    if (!entity.userId) {
      entity.userId = new Types.ObjectId(dto.user._id);
    }
    return await this.toDto(entity);
  }

  async delete(id: string): Promise<boolean> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new ContentManagerException('You are not authorized');
    }

    const entity = await this.getById(id);

    if (entity.status == '2') {
      throw new ContentManagerException('You can not delete active entities');
    }

    if (entity.user.roles.length === 1) {
      await this._userService.delete(entity.user._id);
    } else {
      entity.user.roles = entity.user.roles.filter((role) => role !== '1');
      await this._userService.update(entity.user);
    }

    return await this._repo.delete(id);
  }

  async approve(id: string): Promise<ResourceContentManagerDto> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new ContentManagerException(
        'You are not authorized to perform this action.',
      );
    }

    const entity = await this.getById(id);

    if (entity.status == '2')
      throw new ContentManagerException('This entity is already approved!');

    entity.status = '2';
    return await this.update(entity);
  }

  async reject(id: string): Promise<Boolean> {
    const userId = UserRequested.userId;

    const authorized = await this.isAuthorized(userId);

    if (!authorized) {
      throw new ContentManagerException('Not authorized!');
    }

    const entity = await this.getById(id);

    if (entity.status != '1') {
      throw new ContentManagerException(
        'You can only reject pending entities!',
      );
    }
    return await this.delete(id);
  }

  async deactivate(id: string): Promise<ResourceContentManagerDto> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new ContentManagerException('You are not authorized');
    }

    const userRequested = await this._userService.getById(UserRequested.userId);
    const dto = await this.getById(id);

    if (dto.status == '1') {
      throw new ContentManagerException('This entity is still pending!');
    }

    if (
      !userRequested.roles.includes('0') &&
      !userRequested.roles.includes('1') &&
      !userRequested.roles.includes('2')
    ) {
      const userEntity = await this.getByUserId(userRequested._id);
      if (userEntity._id != id) {
        throw new ContentManagerException(
          'You are not authorized to deactivate this entity.',
        );
      }
    }

    const entity = new UpdateContentManagerDto();
    entity._id = dto._id;
    entity.status = '3';
    entity.user = dto.user;
    return await this.update(entity);
  }

  async getByUserId(id: string): Promise<ResourceContentManagerDto> {
    const entities = await this._repo.findAll();
    const entity = entities.find((entity) => entity.userId.toString() === id);

    if (!entity) {
      throw new ContentManagerException('Entity not found');
    }

    return await this.toDto(entity);
  }

  private async isAuthorized(userId: string): Promise<boolean> {
    const user = await this._userService.getById(userId);
    let isAdmin = false;
    let isOwner = false;
    let isManager = false;
    let isContentManager = false;

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
    } else if (user.roles.includes('4')) {
      const contentManager = await this.getByUserId(userId);

      if (contentManager && contentManager.status == '2') {
        isContentManager = true;
      }
    }
    return isAdmin || isOwner || isManager || isContentManager;
  }

  private async toDto(
    entity: ContentManager,
  ): Promise<ResourceContentManagerDto> {
    const dto = new ResourceContentManagerDto();
    dto._id = entity._id.toString();
    dto.status = entity.status;
    dto.user = await this._userService.getById(entity.userId.toString());

    return dto;
  }
}
