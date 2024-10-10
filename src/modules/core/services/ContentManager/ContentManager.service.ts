import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ContentManager } from '../../entity/ContentManager/ContentManager.schema';
import { ResourceContentManagerDto } from '../../dto/ContentManager/resource.ContentManager';
import { CreateContentManagerDto } from '../../dto/ContentManager/create.ContentManager';
import { UpdateContentManagerDto } from '../../dto/ContentManager/update.ContentManager';

@Injectable()
export class ContentManagerService {
  private readonly _repo: IMongoRepository<ContentManager>;

  constructor(
    @Inject('CONTENTMANAGER_MODEL')
    private _ContentManagerModel: Model<ContentManager>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<ContentManager>(_ContentManagerModel);
  }

  async list(): Promise<ResourceContentManagerDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      ContentManager,
      ResourceContentManagerDto,
    );
  }

  async getById(id: string): Promise<ResourceContentManagerDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      ContentManager,
      ResourceContentManagerDto,
    );
  }

  async create(
    dto: CreateContentManagerDto,
  ): Promise<ResourceContentManagerDto> {
    return this._mapper.map(
      await this._repo.create(new this._ContentManagerModel(dto)),
      ContentManager,
      ResourceContentManagerDto,
    );
  }

  async update(
    dto: UpdateContentManagerDto,
  ): Promise<ResourceContentManagerDto> {
    return this._mapper.map(
      await this._repo.update(new this._ContentManagerModel(dto)),
      ContentManager,
      ResourceContentManagerDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}
