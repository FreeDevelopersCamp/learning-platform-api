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

@Injectable()
export class ManagerService {
  private readonly _repo: IMongoRepository<Manager>;

  constructor(
    @Inject('MANAGER_MODEL') private _managerModel: Model<Manager>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
  ) {
    this._repo = new MongoRepository<Manager>(_managerModel);
  }

  async list(): Promise<ResourceManagerDto[]> {
    const entities = await this._repo.findAll();
    return await Promise.all(
      entities.map((entity) => this.getById(entity._id.toString())),
    );
  }

  async getById(id: string): Promise<ResourceManagerDto> {
    const entity = await this._repo.findOne(id);
    return this.toDto(entity);
  }

  async create(dto: CreateManagerDto): Promise<ResourceManagerDto> {
    const entity = await this._repo.create(new this._managerModel(dto));
    return this.getById(entity._id.toString());
  }

  async update(dto: UpdateManagerDto): Promise<ResourceManagerDto> {
    const entity = await this._repo.update(new this._managerModel(dto));
    return this.getById(entity._id.toString());
  }

  async delete(id: string): Promise<boolean> {
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
    const entity = await this.getById(id);

    entity.status = '2';
    return await this.update(entity);
  }

  async reject(id: string): Promise<Boolean> {
    return this.delete(id);
  }

  private async toDto(entity: Manager): Promise<ResourceManagerDto> {
    const dto = new ResourceManagerDto();
    dto._id = entity._id.toString();
    dto.status = entity.status;
    dto.user = await this._userService.getById(entity.userId.toString());

    return dto;
  }
}
