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
    const courses = await this._repo.findAll();
    return Promise.all(courses.map((course) => this.toDto(course)));
  }

  async getById(id: string): Promise<ResourceCourseDto> {
    return this.toDto(await this._repo.findOne(id));
  }

  async create(dto: CreateCourseDto): Promise<ResourceCourseDto> {
    return this.toDto(await this._repo.create(new this._courseModel(dto)));
  }

  async update(dto: UpdateCourseDto): Promise<ResourceCourseDto> {
    return this.toDto(await this._repo.update(new this._courseModel(dto)));
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }

  private async toDto(entity: Course): Promise<ResourceCourseDto> {
    const entityDto = new ResourceCourseDto();
    entityDto._id = entity._id.toString();
    entityDto.name = entity.name;
    entityDto.instructorId = entity.instructorId.toString();
    entityDto.description = entity.description;
    entityDto.resources = entity.resources;
    entityDto.tips = entity.tips;
    return entityDto;
  }
}
