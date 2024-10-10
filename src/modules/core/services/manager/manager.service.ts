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

@Injectable()
export class ManagerService {
  private readonly _repo: IMongoRepository<Manager>;

  constructor(
    @Inject('MANAGER_MODEL') private _managerModel: Model<Manager>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Manager>(_managerModel);
  }

  async list(): Promise<ResourceManagerDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Manager,
      ResourceManagerDto,
    );
  }

  async getById(id: string): Promise<ResourceManagerDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Manager,
      ResourceManagerDto,
    );
  }

  async create(dto: CreateManagerDto): Promise<ResourceManagerDto> {
    return this._mapper.map(
      await this._repo.create(new this._managerModel(dto)),
      Manager,
      ResourceManagerDto,
    );
  }

  async update(dto: UpdateManagerDto): Promise<ResourceManagerDto> {
    return this._mapper.map(
      await this._repo.update(new this._managerModel(dto)),
      Manager,
      ResourceManagerDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}
