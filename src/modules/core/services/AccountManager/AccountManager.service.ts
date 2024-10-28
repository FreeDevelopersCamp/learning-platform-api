import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { AccountManager } from '../../entity/AccountManager/AccountManager.schema';
import { ResourceAccountManagerDto } from '../../dto/AccountManager/resource.AccountManager';
import { CreateAccountManagerDto } from '../../dto/AccountManager/create.AccountManager';
import { UpdateAccountManagerDto } from '../../dto/AccountManager/update.AccountManager';
import { UserService } from '../user/user.service';

@Injectable()
export class AccountManagerService {
  private readonly _repo: IMongoRepository<AccountManager>;

  constructor(
    @Inject('ACCOUNTMANAGER_MODEL')
    private _AccountManagerModel: Model<AccountManager>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
  ) {
    this._repo = new MongoRepository<AccountManager>(_AccountManagerModel);
  }

  async list(): Promise<ResourceAccountManagerDto[]> {
    const entities = await this._repo.findAll();
    return Promise.all(
      entities.map(async (entity) => {
        return await this.getById(entity._id.toString());
      }),
    );
  }

  async getById(id: string): Promise<ResourceAccountManagerDto> {
    const entity = await this._repo.findOne(id);
    return this.toDto(entity);
  }

  async create(
    dto: CreateAccountManagerDto,
  ): Promise<ResourceAccountManagerDto> {
    const entity = await this._repo.create(new this._AccountManagerModel(dto));
    return this.getById(entity._id.toString());
  }

  async update(
    dto: UpdateAccountManagerDto,
  ): Promise<ResourceAccountManagerDto> {
    const entity = await this._repo.update(new this._AccountManagerModel(dto));
    return this.getById(entity._id.toString());
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.getById(id);

    if (entity.user.roles.length === 1) {
      await this._userService.delete(entity.user._id);
    } else {
      entity.user.roles = entity.user.roles.filter((role) => role !== '6');
      await this._userService.update(entity.user);
    }

    return await this._repo.delete(id);
  }

  async approve(id: string): Promise<ResourceAccountManagerDto> {
    const entity = await this.getById(id);

    entity.status = '2';
    return await this.update(entity);
  }

  async reject(id: string): Promise<Boolean> {
    return this.delete(id);
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
