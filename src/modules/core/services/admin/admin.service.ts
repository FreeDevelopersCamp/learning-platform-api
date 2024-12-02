import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Admin } from '../../entity/admin/admin.schema';
import { ResourceAdminDto } from '../../dto/admin/resource.admin';
import { CreateAdminDto } from '../../dto/admin/create.admin';
import { UpdateAdminDto } from '../../dto/admin/update.admin';
import { UserService } from '../user/user.service';
import { AdminException } from 'src/utils/exception';
import { UserRequested } from 'src/infra/system/system.constant';

@Injectable()
export class AdminService {
  private readonly _repo: IMongoRepository<Admin>;

  constructor(
    @Inject('ADMIN_MODEL') private _adminModel: Model<Admin>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
  ) {
    this._repo = new MongoRepository<Admin>(_adminModel);
  }

  async list(): Promise<ResourceAdminDto[]> {
    const entities = await this._repo.findAll();

    const entitiesDto = await Promise.all(
      entities.map(async (entity) => {
        return this.getById.call(this, entity._id.toString());
      }),
    );
    return entitiesDto;
  }

  async getById(id: string): Promise<ResourceAdminDto> {
    const entity = await this._repo.findOne(id);
    return this.toDto(entity);
  }

  async create(dto: CreateAdminDto): Promise<ResourceAdminDto> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new AdminException('You are not authorized');
    }

    const entity = await this._repo.create(new this._adminModel(dto));
    return this.getById(entity._id.toString());
  }

  async update(dto: UpdateAdminDto): Promise<ResourceAdminDto> {
    const entity = await this._repo.update(new this._adminModel(dto));
    return this.getById(entity._id.toString());
  }

  async delete(id: string): Promise<boolean> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new AdminException('You are not authorized');
    }

    const entity = await this.getById(id);

    if (entity.status == '2') {
      throw new AdminException('You can not delete active entities');
    }

    if (entity.user.roles.length === 1) {
      await this._userService.delete(entity.user._id);
    } else {
      entity.user.roles = entity.user.roles.filter((role) => role !== '0');
      await this._userService.update(entity.user);
    }

    return await this._repo.delete(id);
  }

  async deactivate(id: string): Promise<ResourceAdminDto> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new AdminException('You are not authorized');
    }

    const userRequested = await this._userService.getById(UserRequested.userId);
    const dto = await this.getById(id);

    if (dto.status == '1') {
      throw new AdminException('This entity is still pending!');
    }

    const userEntity = await this.getByUserId(userRequested._id);
    if (userEntity._id != id) {
      throw new AdminException(
        'You are not authorized to deactivate this entity.',
      );
    }

    const entity = new UpdateAdminDto();
    entity._id = dto._id;
    entity.status = '3';
    entity.user = dto.user;
    return await this.update(entity);
  }

  private async isAuthorized(userId: string): Promise<boolean> {
    const user = await this._userService.getById(userId);
    let isAdmin = false;

    if (user.roles.includes('0')) {
      const admin = await this.getByUserId(userId);

      if (admin && admin.status == '2') {
        isAdmin = true;
      }
    }
    return isAdmin;
  }

  async getByUserId(id: string): Promise<ResourceAdminDto> {
    await this.isAuthorized(UserRequested.userId);

    const entities = await this._repo.findAll();
    const entity = entities.find((entity) => entity.userId.toString() === id);

    if (!entity) {
      throw new AdminException('Entity not found');
    }

    return await this.toDto(entity);
  }

  private async toDto(entity: Admin): Promise<ResourceAdminDto> {
    const dto = new ResourceAdminDto();
    dto._id = entity._id.toString();
    dto.status = entity.status;
    dto.user = await this._userService.getById(entity.userId.toString());
    return dto;
  }
}
