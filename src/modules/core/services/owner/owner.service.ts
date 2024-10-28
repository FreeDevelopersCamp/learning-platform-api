import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Owner } from '../../entity/owner/owner.schema';
import { ResourceOwnerDto } from '../../dto/owner/resource.owner';
import { CreateOwnerDto } from '../../dto/owner/create.owner';
import { UpdateOwnerDto } from '../../dto/owner/update.owner';
import { UserService } from '../user/user.service';
import { UserRequested } from 'src/infra/system/system.constant';
import { AdminService } from '../admin/admin.service';
import { OwnerException } from 'src/utils/exception';

@Injectable()
export class OwnerService {
  private readonly _repo: IMongoRepository<Owner>;

  constructor(
    @Inject('OWNER_MODEL') private _ownerModel: Model<Owner>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private readonly _adminService: AdminService,
  ) {
    this._repo = new MongoRepository<Owner>(_ownerModel);
  }

  async list(): Promise<ResourceOwnerDto[]> {
    try {
      const userId = UserRequested.userId;
      console.log('User ID:', userId); // Log userId once for debugging

      const authorized = await this.isAuthorized(userId);
      console.log('Authorized:', authorized); // Log authorization status once for debugging

      if (!authorized) {
        throw new OwnerException('Not Approved!');
      }

      const entities = await this._repo.findAll();
      console.log('Entities:', entities); // Log entities for debugging

      const entitiesDto = await Promise.all(
        entities.map(async (entity) => {
          const entityDto = await this.getById(entity._id.toString());
          console.log('Entity DTO:', entityDto); // Log each entity DTO for debugging
          return entityDto;
        }),
      );

      return entitiesDto;
    } catch (error) {
      console.error('Error in list method:', error);
    }
  }

  async getById(id: string): Promise<ResourceOwnerDto> {
    this.isAuthorized(UserRequested.userId);

    const entity = await this._repo.findOne(id);
    return this.toDto(entity);
  }

  async create(dto: CreateOwnerDto): Promise<ResourceOwnerDto> {
    this.isAuthorized(UserRequested.userId);

    const entity = await this._repo.create(new this._ownerModel(dto));
    return this.getById(entity._id.toString());
  }

  async update(dto: UpdateOwnerDto): Promise<ResourceOwnerDto> {
    this.isAuthorized(UserRequested.userId);

    const entity = await this._repo.update(new this._ownerModel(dto));
    return this.getById(entity._id.toString());
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.getById(id);

    if (entity.user.roles.length === 1) {
      await this._userService.delete(entity.user._id);
    } else {
      entity.user.roles = entity.user.roles.filter((role) => role !== '1');
      await this._userService.update(entity.user);
    }

    return await this._repo.delete(id);
  }

  async getByUserId(id: string): Promise<ResourceOwnerDto> {
    const entities = await this._repo.findAll();
    const entity = entities.find((entity) => entity.userId.toString() === id);

    if (!entity) {
      throw new OwnerException('Entity not found');
    }

    return this.getById(entity._id.toString());
  }

  async approve(id: string): Promise<ResourceOwnerDto> {
    const authorized = this.isAuthorized(UserRequested.userId);
    if (authorized) {
      const entity = await this.getById(id);

      entity.status = '2';
      return await this.update(entity);
    } else {
      throw new OwnerException(
        'You are not authorized to perform this action.',
      );
    }
  }

  async reject(id: string): Promise<Boolean> {
    const userId = UserRequested.userId;

    const authorized = this.isAuthorized(userId);

    if (authorized) {
      return this.delete(id);
    } else {
      throw new OwnerException(
        'You are not authorized to perform this action.',
      );
    }
  }

  private async isAuthorized(userId: string): Promise<boolean> {
    const user = await this._userService.getById(userId);

    let isAdmin = false;
    let isOwner = false;

    if (user.roles.includes('0')) {
      const admin = await this._adminService.getByUserId(userId);

      if (admin && admin.status == '2') {
        isAdmin = true;
      }
    } else if (user.roles.includes('1')) {
      const owner = await this.getByUserId(userId);

      if (owner && owner.status == '2') {
        isOwner = true;
      }
    }
    return isAdmin || isOwner;
  }

  private async toDto(entity: Owner): Promise<ResourceOwnerDto> {
    const dto = new ResourceOwnerDto();
    dto._id = entity._id.toString();
    dto.status = entity.status;
    dto.user = await this._userService.getById(entity.userId.toString());
    return dto;
  }
}
