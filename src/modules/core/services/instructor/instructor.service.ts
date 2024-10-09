import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Instructor } from '../../entity/instructor/instructor.schema';
import { ResourceInstructorDto } from '../../dto/instructor/resource.instructor';
import { CreateInstructorDto } from '../../dto/instructor/create.instructor';
import { UpdateInstructorDto } from '../../dto/instructor/update.instructor';

@Injectable()
export class InstructorService {
  private readonly _repo: IMongoRepository<Instructor>;

  constructor(
    @Inject('INSTRUCTOR_MODEL') private _instructorModel: Model<Instructor>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Instructor>(_instructorModel);
  }

  async list(): Promise<ResourceInstructorDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Instructor,
      ResourceInstructorDto,
    );
  }

  async getById(id: string): Promise<ResourceInstructorDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Instructor,
      ResourceInstructorDto,
    );
  }

  async create(dto: CreateInstructorDto): Promise<ResourceInstructorDto> {
    return this._mapper.map(
      await this._repo.create(new this._instructorModel(dto)),
      Instructor,
      ResourceInstructorDto,
    );
  }

  async update(dto: UpdateInstructorDto): Promise<ResourceInstructorDto> {
    return this._mapper.map(
      await this._repo.update(new this._instructorModel(dto)),
      Instructor,
      ResourceInstructorDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}
