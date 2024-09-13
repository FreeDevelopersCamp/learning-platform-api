import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Tutorial } from '../../entity/tutorial/tutorial.schema';
import { ResourceTutorialDto } from '../../dto/tutorial/resource.tutorial';
import { CreateTutorialDto } from '../../dto/tutorial/create.tutorial';
import { UpdateTutorialDto } from '../../dto/tutorial/update.tutorial';

@Injectable()
export class TutorialService {
  private readonly _repo: IMongoRepository<Tutorial>;

  constructor(
    @Inject('TUTORIAL_MODEL') private _tutorialModel: Model<Tutorial>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Tutorial>(_tutorialModel);
  }

  async list(): Promise<ResourceTutorialDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Tutorial,
      ResourceTutorialDto,
    );
  }

  async getById(id: string): Promise<ResourceTutorialDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Tutorial,
      ResourceTutorialDto,
    );
  }

  async create(dto: CreateTutorialDto): Promise<ResourceTutorialDto> {
    return this._mapper.map(
      await this._repo.create(new this._tutorialModel(dto)),
      Tutorial,
      ResourceTutorialDto,
    );
  }

  async update(dto: UpdateTutorialDto): Promise<ResourceTutorialDto> {
    return this._mapper.map(
      await this._repo.update(new this._tutorialModel(dto)),
      Tutorial,
      ResourceTutorialDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}

