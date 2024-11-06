import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Exam } from '../../entity/exam/exam.schema';
import { ResourceExamDto } from '../../dto/exam/resource.exam';
import { CreateExamDto } from '../../dto/exam/create.exam';
import { UpdateExamDto } from '../../dto/exam/update.exam';

@Injectable()
export class ExamService {
  private readonly _repo: IMongoRepository<Exam>;

  constructor(
    @Inject('EXAM_MODEL') private _examModel: Model<Exam>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Exam>(_examModel);
  }

  async list(): Promise<ResourceExamDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Exam,
      ResourceExamDto,
    );
  }

  async getById(id: string): Promise<ResourceExamDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Exam,
      ResourceExamDto,
    );
  }

  async create(dto: CreateExamDto): Promise<ResourceExamDto> {
    return this._mapper.map(
      await this._repo.create(new this._examModel(dto)),
      Exam,
      ResourceExamDto,
    );
  }

  async update(dto: UpdateExamDto): Promise<ResourceExamDto> {
    return this._mapper.map(
      await this._repo.update(new this._examModel(dto)),
      Exam,
      ResourceExamDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}

