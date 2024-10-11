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
    const managers = await this._repo.findAll();
    const managersDto = await Promise.all(
      managers.map((manager) => this.getById(manager._id.toString())),
    );
    return managersDto;
  }

  async getById(id: string): Promise<ResourceManagerDto> {
    const manager = await this._repo.findOne(id);
    return this.toDto(manager);
  }

  async create(dto: CreateManagerDto): Promise<ResourceManagerDto> {
    const manager = await this._repo.create(new this._managerModel(dto));
    return this.getById(manager._id.toString());
  }

  async update(dto: UpdateManagerDto): Promise<ResourceManagerDto> {
    const manager = await this._repo.update(new this._managerModel(dto));
    return this.getById(manager._id.toString());
  }

  async delete(id: string): Promise<boolean> {
    const manager = await this.getById(id);

    if (manager.user.roles.length === 1) {
      await this._userService.delete(manager.user._id);
    }

    return await this._repo.delete(id);
  }

  async approveManager(id: string): Promise<ResourceManagerDto> {
    const manager = await this.getById(id);

    manager.status = '2';
    return await this.update(manager);
  }

  private async toDto(manager: Manager): Promise<ResourceManagerDto> {
    const managerDto = new ResourceManagerDto();
    managerDto._id = manager._id.toString();
    managerDto.status = manager.status;
    managerDto.user = await this._userService.getById(manager.userId);

    return managerDto;
  }
}
