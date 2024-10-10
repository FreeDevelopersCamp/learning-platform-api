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
import { ManagerService } from '../manager/manager.service';
import { ResourceManagerDto } from '../../dto/manager/resource.manager';

@Injectable()
export class OwnerService {
  private readonly _repo: IMongoRepository<Owner>;

  constructor(
    @Inject('OWNER_MODEL') private _ownerModel: Model<Owner>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private readonly _managerService: ManagerService,
  ) {
    this._repo = new MongoRepository<Owner>(_ownerModel);
  }

  async list(): Promise<ResourceOwnerDto[]> {
    const owners = await this._repo.findAll();

    const ownersDto = await Promise.all(
      owners.map(async (owner) => {
        return this.getById.call(this, owner._id.toString());
      }),
    );
    return ownersDto;
  }

  async getById(id: string): Promise<ResourceOwnerDto> {
    const owner = await this._repo.findOne(id);
    return this.toDto(owner);
  }

  async create(dto: CreateOwnerDto): Promise<ResourceOwnerDto> {
    const owner = await this._repo.create(new this._ownerModel(dto));
    return this.getById(owner._id.toString());
  }

  async update(dto: UpdateOwnerDto): Promise<ResourceOwnerDto> {
    const owner = await this._repo.update(new this._ownerModel(dto));
    return this.getById(owner._id.toString());
  }

  async delete(id: string): Promise<boolean> {
    const owner = await this.getById(id);

    if (owner.user.roles.length === 1) {
      await this._userService.delete(owner.user._id);
    }

    return await this._repo.delete(id);
  }

  async listManagers(): Promise<ResourceManagerDto[]> {
    return await this._managerService.list();
  }

  async approveManager(id: string): Promise<ResourceManagerDto> {
    const manager = await this._managerService.getById(id);

    manager.status = '2';
    return await this._managerService.update(manager);
  }

  private async toDto(owner: Owner): Promise<ResourceOwnerDto> {
    const ownerDto = new ResourceOwnerDto();
    ownerDto._id = owner._id.toString();
    ownerDto.user = await this._userService.getById(owner.userId.toString());
    return ownerDto;
  }
}
