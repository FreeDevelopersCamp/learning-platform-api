import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Manager } from '../../entity/manager/manager.schema';
import { ResourceManagerDto } from '../../dto/manager/resource.manager';
import { CreateManagerDto } from '../../dto/manager/create.manager';
import { UpdateManagerDto } from '../../dto/manager/update.manager';
import { UserService } from '../user/user.service';
import { AdminService } from '../admin/admin.service';
import { OwnerService } from '../owner/owner.service';
import { UserRequested } from 'src/infra/system/system.constant';
import { ManagerException } from 'src/utils/exception';

@Injectable()
export class ManagerService {
  private readonly _repo: IMongoRepository<Manager>;

  constructor(
    @Inject('MANAGER_MODEL') private _managerModel: Model<Manager>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private readonly _adminService: AdminService,
    private readonly _ownerService: OwnerService,
  ) {
    this._repo = new MongoRepository<Manager>(_managerModel);
  }

  async list(): Promise<ResourceManagerDto[]> {
    try {
      const userId = UserRequested.userId;
      const authorized = await this.canApprove(userId);

      if (!authorized) {
        throw new ManagerException('Not Approved!');
      }

      const entities = await this._repo.findAll();

      return await Promise.all(
        entities.map(async (entity) => {
          return await this.toDto(entity);
        }),
      );
    } catch (error) {
      console.error('Error in list method:', error);
    }
  }

  async getById(id: string): Promise<ResourceManagerDto> {
    this.canApprove(UserRequested.userId);

    const entity = await this._repo.findOne(id);
    return this.toDto(entity);
  }

  async create(dto: CreateManagerDto): Promise<ResourceManagerDto> {
    this.canApprove(UserRequested.userId);

    const entity = await this._repo.create(new this._managerModel(dto));
    return this.getById(entity._id.toString());
  }

  async update(dto: UpdateManagerDto): Promise<ResourceManagerDto> {
    this.canApprove(UserRequested.userId);

    const entity = await this._repo.update(new this._managerModel(dto));
    return this.getById(entity._id.toString());
  }

  async delete(id: string): Promise<boolean> {
    this.canApprove(UserRequested.userId);

    const entity = await this.getById(id);

    if (entity.user.roles.length === 1) {
      await this._userService.delete(entity.user._id);
    } else {
      entity.user.roles = entity.user.roles.filter((role) => role !== '4');
      await this._userService.update(entity.user);
    }

    return await this._repo.delete(id);
  }

  async approve(id: string): Promise<ResourceManagerDto> {
    const authorized = this.canApprove(UserRequested.userId);
    if (authorized) {
      const entity = await this.getById(id);

      entity.status = '2';
      return await this.update(entity);
    } else {
      throw new ManagerException(
        'You are not authorized to perform this action.',
      );
    }
  }

  async reject(id: string): Promise<Boolean> {
    const userId = UserRequested.userId;

    const authorized = this.canReject(userId);

    if (authorized) {
      return this.delete(id);
    } else {
      throw new ManagerException(
        'You are not authorized to perform this action.',
      );
    }
  }

  private async canApprove(userId: string): Promise<boolean> {
    const user = await this._userService.getById(userId);
    let isAdmin = false;
    let isOwner = false;
    let isManager = false;

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
    } else if (user.roles.includes('4')) {
      const manager = await this.getByUserId(userId);

      if (manager && manager.status == '2') {
        isManager = true;
      }
    }
    return isAdmin || isOwner || isManager;
  }

  private async canReject(userId: string): Promise<boolean> {
    const user = await this._userService.getById(userId);
    let isAdmin = false;
    let isOwner = false;

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
    }
    return isAdmin || isOwner;
  }

  async getByUserId(id: string): Promise<ResourceManagerDto> {
    const entities = await this._repo.findAll();
    const entity = entities.find((entity) => entity.userId.toString() === id);

    if (!entity) {
      throw new ManagerException('Entity not found');
    }

    return this.getById(entity._id.toString());
  }

  private async toDto(entity: Manager): Promise<ResourceManagerDto> {
    const dto = new ResourceManagerDto();
    dto._id = entity._id.toString();
    dto.status = entity.status;
    dto.user = await this._userService.getById(entity.userId.toString());

    return dto;
  }
}
