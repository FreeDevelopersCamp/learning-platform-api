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

@Injectable()
export class AccountManagerService {
  private readonly _repo: IMongoRepository<AccountManager>;

  constructor(
    @Inject('ACCOUNTMANAGER_MODEL')
    private _AccountManagerModel: Model<AccountManager>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<AccountManager>(_AccountManagerModel);
  }

  async list(): Promise<ResourceAccountManagerDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      AccountManager,
      ResourceAccountManagerDto,
    );
  }

  async getById(id: string): Promise<ResourceAccountManagerDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      AccountManager,
      ResourceAccountManagerDto,
    );
  }

  async create(
    dto: CreateAccountManagerDto,
  ): Promise<ResourceAccountManagerDto> {
    return this._mapper.map(
      await this._repo.create(new this._AccountManagerModel(dto)),
      AccountManager,
      ResourceAccountManagerDto,
    );
  }

  async update(
    dto: UpdateAccountManagerDto,
  ): Promise<ResourceAccountManagerDto> {
    return this._mapper.map(
      await this._repo.update(new this._AccountManagerModel(dto)),
      AccountManager,
      ResourceAccountManagerDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}
