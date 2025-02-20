import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { AccountManager } from '../../entity/AccountManager/AccountManager.schema';
import { ResourceAccountManagerDto } from '../../dto/AccountManager/resource.AccountManager';
import { CreateAccountManagerDto } from '../../dto/AccountManager/create.AccountManager';
import { UpdateAccountManagerDto } from '../../dto/AccountManager/update.AccountManager';
import { UserService } from '../user/user.service';
import { AccountManagerException } from 'src/utils/exception';
import { AdminService } from '../admin/admin.service';
import { OwnerService } from '../owner/owner.service';
import { ManagerService } from '../manager/manager.service';

@Injectable()
export class AccountManagerService {
  private readonly _repo: IMongoRepository<AccountManager>;

  constructor(
    @Inject('ACCOUNTMANAGER_MODEL')
    private _AccountManagerModel: Model<AccountManager>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private readonly _adminService: AdminService,
    private readonly _ownerService: OwnerService,
    private readonly _managerService: ManagerService,
  ) {
    this._repo = new MongoRepository<AccountManager>(_AccountManagerModel);
  }

  async list(): Promise<ResourceAccountManagerDto[]> {
    const entities = await this._repo.findAll();

    return await Promise.all(
      entities.map(async (entity) => {
        return await this.toDto(entity);
      }),
    );
  }

  async getById(id: string): Promise<ResourceAccountManagerDto> {
    const entity = await this._repo.findOne(id);
    return await this.toDto(entity);
  }

  async create(
    dto: CreateAccountManagerDto,
  ): Promise<ResourceAccountManagerDto> {
    const entity = await this._repo.create(new this._AccountManagerModel(dto));
    return await this.toDto(entity);
  }

  async update(
    dto: UpdateAccountManagerDto,
  ): Promise<ResourceAccountManagerDto> {
    const entity = await this._repo.update(new this._AccountManagerModel(dto));
    if (!entity.userId) {
      entity.userId = new Types.ObjectId(dto.user._id);
    }
    return await this.toDto(entity);
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.getById(id);

    if (entity.status == '2') {
      throw new AccountManagerException('You can not delete active entities');
    }

    if (entity.user.roles.length === 1) {
      await this._userService.delete(entity.user._id);
    } else {
      entity.user.roles = entity.user.roles.filter((role) => role !== '3');
      await this._userService.update(entity.user);
    }

    return await this._repo.delete(id);
  }

  async approve(id: string): Promise<ResourceAccountManagerDto> {
    const entity = await this.getById(id);

    if (entity.status == '2')
      throw new AccountManagerException('This entity is already approved!');

    entity.status = '2';
    return await this.update(entity);
  }

  async reject(id: string): Promise<Boolean> {
    const entity = await this.getById(id);

    if (entity.status != '1') {
      throw new AccountManagerException(
        'You can only reject pending entities!',
      );
    }
    return await this.delete(id);
  }

  async deactivate(id: string): Promise<ResourceAccountManagerDto> {
    // const authorized = await this.isAuthorized(UserRequested.userId);

    // if (!authorized) {
    //   throw new AccountManagerException('You are not authorized');
    // }

    // const userRequested = await this._userService.getById(UserRequested.userId);
    const dto = await this.getById(id);

    if (dto.status == '1') {
      throw new AccountManagerException('This entity is still pending!');
    }

    // if (
    //   !userRequested.roles.includes('0') &&
    //   !userRequested.roles.includes('1') &&
    //   !userRequested.roles.includes('2')
    // ) {
    //   const userEntity = await this.getByUserId(userRequested._id);
    //   if (userEntity._id != id) {
    //     throw new AccountManagerException(
    //       'You are not authorized to deactivate this entity.',
    //     );
    //   }
    // }

    const entity = new UpdateAccountManagerDto();
    entity._id = dto._id;
    entity.status = '3';
    entity.user = dto.user;
    return await this.update(entity);
  }

  async getByUserId(id: string): Promise<ResourceAccountManagerDto> {
    // await this.isAuthorized(UserRequested.userId);

    const entities = await this._repo.findAll();
    const entity = entities.find((entity) => entity.userId.toString() === id);

    if (!entity) {
      throw new AccountManagerException('Entity not found');
    }

    return await this.toDto(entity);
  }

  private async isAuthorized(userId: string): Promise<boolean> {
    const user = await this._userService.getById(userId);
    let isAdmin = false;
    let isOwner = false;
    let isManager = false;
    let isAccountManager = false;

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
      const accountManager = await this.getByUserId(userId);

      if (accountManager && accountManager.status == '2') {
        isAccountManager = true;
      }
    }
    return isAdmin || isOwner || isManager || isAccountManager;
  }

  private async toDto(
    entity: AccountManager,
  ): Promise<ResourceAccountManagerDto> {
    const dto = new ResourceAccountManagerDto();
    dto._id = entity._id.toString();
    dto.status = entity.status;
    dto.user = await this._userService.getById(entity.userId.toString());

    return dto;
  }
}
