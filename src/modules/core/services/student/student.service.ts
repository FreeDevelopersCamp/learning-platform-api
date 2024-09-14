import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Student } from '../../entity/student/student.schema';
import { ResourceStudentDto } from '../../dto/student/resource.student';
import { CreateStudentDto } from '../../dto/student/create.student';
import { UpdateStudentDto } from '../../dto/student/update.student';

@Injectable()
export class StudentService {
  private readonly _repo: IMongoRepository<Student>;

  constructor(
    @Inject('STUDENT_MODEL') private _studentModel: Model<Student>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Student>(_studentModel);
  }

  async list(): Promise<ResourceStudentDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Student,
      ResourceStudentDto,
    );
  }

  async getById(id: string): Promise<ResourceStudentDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Student,
      ResourceStudentDto,
    );
  }

  async create(dto: CreateStudentDto): Promise<ResourceStudentDto> {
    return this._mapper.map(
      await this._repo.create(new this._studentModel(dto)),
      Student,
      ResourceStudentDto,
    );
  }

  async update(dto: UpdateStudentDto): Promise<ResourceStudentDto> {
    return this._mapper.map(
      await this._repo.update(new this._studentModel(dto)),
      Student,
      ResourceStudentDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}

