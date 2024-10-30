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
    const entity = await this._repo.create(new this._adminModel(dto));
    return this.getById(entity._id.toString());
  }

  async update(dto: UpdateAdminDto): Promise<ResourceAdminDto> {
    const entity = await this._repo.update(new this._adminModel(dto));
    return this.getById(entity._id.toString());
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.getById(id);

    if (entity.user.roles.length === 1) {
      await this._userService.delete(entity.user._id);
    } else {
      entity.user.roles = entity.user.roles.filter((role) => role !== '0');
      await this._userService.update(entity.user);
    }

    return await this._repo.delete(id);
  }

  async getByUserId(id: string): Promise<ResourceAdminDto> {
    const entities = await this.list();
    return entities.find((entity) => entity.user._id === id);
  }

  private async toDto(entity: Admin): Promise<ResourceAdminDto> {
    const dto = new ResourceAdminDto();
    dto._id = entity._id.toString();
    dto.status = entity.status;
    dto.user = await this._userService.getById(entity.userId.toString());
    return dto;
  }
}
