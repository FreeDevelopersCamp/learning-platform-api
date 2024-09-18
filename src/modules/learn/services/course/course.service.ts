import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Course } from '../../entity/course/course.schema';
import { ResourceCourseDto } from '../../dto/course/resource.course';
import { CreateCourseDto } from '../../dto/course/create.course';
import { UpdateCourseDto } from '../../dto/course/update.course';

@Injectable()
export class CourseService {
  private readonly _repo: IMongoRepository<Course>;

  constructor(
    @Inject('COURSE_MODEL') private _courseModel: Model<Course>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Course>(_courseModel);
  }

  async list(): Promise<ResourceCourseDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Course,
      ResourceCourseDto,
    );
  }

  async getById(id: string): Promise<ResourceCourseDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Course,
      ResourceCourseDto,
    );
  }

  async create(dto: CreateCourseDto): Promise<ResourceCourseDto> {
    return this._mapper.map(
      await this._repo.create(new this._courseModel(dto)),
      Course,
      ResourceCourseDto,
    );
  }

  async update(dto: UpdateCourseDto): Promise<ResourceCourseDto> {
    return this._mapper.map(
      await this._repo.update(new this._courseModel(dto)),
      Course,
      ResourceCourseDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}
