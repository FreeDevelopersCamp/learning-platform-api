import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Learner } from '../../entity/learner/learner.schema';
import { ResourceLearnerDto } from '../../dto/learner/resource.learner';
import { CreateLearnerDto } from '../../dto/learner/create.learner';
import { UpdateLearnerDto } from '../../dto/learner/update.learner';

@Injectable()
export class LearnerService {
  private readonly _repo: IMongoRepository<Learner>;

  constructor(
    @Inject('LEARNER_MODEL') private _learnerModel: Model<Learner>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Learner>(_learnerModel);
  }

  async list(): Promise<ResourceLearnerDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Learner,
      ResourceLearnerDto,
    );
  }

  async getById(id: string): Promise<ResourceLearnerDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Learner,
      ResourceLearnerDto,
    );
  }

  async create(dto: CreateLearnerDto): Promise<ResourceLearnerDto> {
    return this._mapper.map(
      await this._repo.create(new this._learnerModel(dto)),
      Learner,
      ResourceLearnerDto,
    );
  }

  async update(dto: UpdateLearnerDto): Promise<ResourceLearnerDto> {
    return this._mapper.map(
      await this._repo.update(new this._learnerModel(dto)),
      Learner,
      ResourceLearnerDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}
