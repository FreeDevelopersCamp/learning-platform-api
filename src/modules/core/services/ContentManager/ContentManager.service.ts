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
import { UserService } from '../user/user.service';

@Injectable()
export class ContentManagerService {
  private readonly _repo: IMongoRepository<ContentManager>;

  constructor(
    @Inject('CONTENTMANAGER_MODEL')
    private _ContentManagerModel: Model<ContentManager>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
  ) {
    this._repo = new MongoRepository<ContentManager>(_ContentManagerModel);
  }

  async list(): Promise<ResourceContentManagerDto[]> {
    const entities = await this._repo.findAll();
    return Promise.all(
      entities.map(async (entity) => {
        return await this.getById(entity._id.toString());
      }),
    );
  }

  async getById(id: string): Promise<ResourceContentManagerDto> {
    const entity = await this._repo.findOne(id);
    return this.toDto(entity);
  }

  async create(
    dto: CreateContentManagerDto,
  ): Promise<ResourceContentManagerDto> {
    const entity = await this._repo.create(new this._ContentManagerModel(dto));
    return this.getById(entity._id.toString());
  }

  async update(
    dto: UpdateContentManagerDto,
  ): Promise<ResourceContentManagerDto> {
    const entity = await this._repo.update(new this._ContentManagerModel(dto));
    return this.getById(entity._id.toString());
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.getById(id);

    if (entity.user.roles.length === 1) {
      await this._userService.delete(entity.user._id);
    } else {
      entity.user.roles = entity.user.roles.filter((role) => role !== '5');
      await this._userService.update(entity.user);
    }

    return await this._repo.delete(id);
  }

  async approve(id: string): Promise<ResourceContentManagerDto> {
    const entity = await this.getById(id);

    entity.status = '2';
    return await this.update(entity);
  }

  async reject(id: string): Promise<Boolean> {
    return this.delete(id);
  }

  private async toDto(
    entity: ContentManager,
  ): Promise<ResourceContentManagerDto> {
    const dto = new ResourceContentManagerDto();
    dto._id = entity._id.toString();
    dto.status = entity.status;
    dto.user = await this._userService.getById(entity.userId.toString());

    return dto;
  }
}
