import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Progress } from '../../entity/progress/progress.schema';
import { ResourceProgressDto } from '../../dto/progress/resource.progress';
import { CreateProgressDto } from '../../dto/progress/create.progress';
import { UpdateProgressDto } from '../../dto/progress/update.progress';

@Injectable()
export class ProgressService {
  private readonly _repo: IMongoRepository<Progress>;

  constructor(
    @Inject('PROGRESS_MODEL') private _progressModel: Model<Progress>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Progress>(_progressModel);
  }

  async list(): Promise<ResourceProgressDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Progress,
      ResourceProgressDto,
    );
  }

  async getById(id: string): Promise<ResourceProgressDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Progress,
      ResourceProgressDto,
    );
  }

  async create(dto: CreateProgressDto): Promise<ResourceProgressDto> {
    return this._mapper.map(
      await this._repo.create(new this._progressModel(dto)),
      Progress,
      ResourceProgressDto,
    );
  }

  async update(dto: UpdateProgressDto): Promise<ResourceProgressDto> {
    return this._mapper.map(
      await this._repo.update(new this._progressModel(dto)),
      Progress,
      ResourceProgressDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}

