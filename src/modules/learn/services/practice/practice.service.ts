import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Practice } from '../../entity/practice/practice.schema';
import { ResourcePracticeDto } from '../../dto/practice/resource.practice';
import { CreatePracticeDto } from '../../dto/practice/create.practice';
import { UpdatePracticeDto } from '../../dto/practice/update.practice';

@Injectable()
export class PracticeService {
  private readonly _repo: IMongoRepository<Practice>;

  constructor(
    @Inject('PRACTICE_MODEL') private _practiceModel: Model<Practice>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Practice>(_practiceModel);
  }

  async list(): Promise<ResourcePracticeDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Practice,
      ResourcePracticeDto,
    );
  }

  async getById(id: string): Promise<ResourcePracticeDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Practice,
      ResourcePracticeDto,
    );
  }

  async create(dto: CreatePracticeDto): Promise<ResourcePracticeDto> {
    return this._mapper.map(
      await this._repo.create(new this._practiceModel(dto)),
      Practice,
      ResourcePracticeDto,
    );
  }

  async update(dto: UpdatePracticeDto): Promise<ResourcePracticeDto> {
    return this._mapper.map(
      await this._repo.update(new this._practiceModel(dto)),
      Practice,
      ResourcePracticeDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}
