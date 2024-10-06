import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Teacher } from '../../entity/teacher/teacher.schema';
import { ResourceTeacherDto } from '../../dto/teacher/resource.teacher';
import { CreateTeacherDto } from '../../dto/teacher/create.teacher';
import { UpdateTeacherDto } from '../../dto/teacher/update.teacher';

@Injectable()
export class TeacherService {
  private readonly _repo: IMongoRepository<Teacher>;

  constructor(
    @Inject('TEACHER_MODEL') private _teacherModel: Model<Teacher>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Teacher>(_teacherModel);
  }

  async list(): Promise<ResourceTeacherDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Teacher,
      ResourceTeacherDto,
    );
  }

  async getById(id: string): Promise<ResourceTeacherDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Teacher,
      ResourceTeacherDto,
    );
  }

  async create(dto: CreateTeacherDto): Promise<ResourceTeacherDto> {
    return this._mapper.map(
      await this._repo.create(new this._teacherModel(dto)),
      Teacher,
      ResourceTeacherDto,
    );
  }

  async update(dto: UpdateTeacherDto): Promise<ResourceTeacherDto> {
    return this._mapper.map(
      await this._repo.update(new this._teacherModel(dto)),
      Teacher,
      ResourceTeacherDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}
