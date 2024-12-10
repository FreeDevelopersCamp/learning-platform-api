import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
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
    const entities = await this._repo.findAll();

    return await Promise.all(
      entities.map(async (entity) => {
        return await this.toDto(entity);
      }),
    );
  }

  async getById(id: string): Promise<ResourceOwnerDto> {
    const entity = await this._repo.findOne(id);
    return await this.toDto(entity);
  }

  async create(dto: CreateOwnerDto): Promise<ResourceOwnerDto> {
    const entity = await this._repo.create(new this._ownerModel(dto));
    return await this.toDto(entity);
  }

  async update(dto: UpdateOwnerDto): Promise<ResourceOwnerDto> {
    const entity = await this._repo.update(new this._ownerModel(dto));
    if (!entity.userId) {
      entity.userId = new Types.ObjectId(dto.user._id);
    }
    return await this.toDto(entity);
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.getById(id);

    if (entity.status == '2') {
      throw new OwnerException('You can not delete active entities');
    }

    if (entity.user.roles.length === 1) {
      await this._userService.delete(entity.user._id);
    } else {
      entity.user.roles = entity.user.roles.filter((role) => role !== '1');
      await this._userService.update(entity.user);
    }

    return await this._repo.delete(id);
  }

  async deactivate(id: string): Promise<ResourceOwnerDto> {
    const userRequested = await this._userService.getById(UserRequested.userId);
    const dto = await this.getById(id);

    if (dto.status == '1') {
      throw new OwnerException('This entity is still pending!');
    }

    if (!userRequested.roles.includes('0')) {
      const userEntity = await this.getByUserId(userRequested._id);
      if (userEntity._id != id) {
        throw new OwnerException(
          'You are not authorized to deactivate this entity.',
        );
      }
    }

    const entity = new UpdateOwnerDto();
    entity._id = dto._id;
    entity.status = '3';
    entity.user = dto.user;
    return await this.update(entity);
  }

  async approve(id: string): Promise<ResourceOwnerDto> {
    const entity = await this.getById(id);

    if (entity.status == '2')
      throw new OwnerException('This entity is already approved!');

    entity.status = '2';
    return await this.update(entity);
  }

  async reject(id: string): Promise<Boolean> {
    const entity = await this.getById(id);

    if (entity.status != '1') {
      throw new OwnerException('You can only reject pending entities!');
    }
    return await this.delete(id);
  }

  async getByUserId(id: string): Promise<ResourceOwnerDto> {
    // await this.isAuthorized(UserRequested.userId);

    const entities = await this._repo.findAll();
    const entity = entities.find((entity) => entity.userId.toString() === id);

    if (!entity) {
      throw new OwnerException('Entity not found');
    }

    return await this.toDto(entity);
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
