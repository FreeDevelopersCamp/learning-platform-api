import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Assignment } from '../../entity/assignment/assignment.schema';
import { ResourceAssignmentDto } from '../../dto/assignment/resource.assignment';
import { CreateAssignmentDto } from '../../dto/assignment/create.assignment';
import { UpdateAssignmentDto } from '../../dto/assignment/update.assignment';

@Injectable()
export class AssignmentService {
  private readonly _repo: IMongoRepository<Assignment>;

  constructor(
    @Inject('ASSIGNMENT_MODEL') private _assignmentModel: Model<Assignment>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Assignment>(_assignmentModel);
  }

  async list(): Promise<ResourceAssignmentDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Assignment,
      ResourceAssignmentDto,
    );
  }

  async getById(id: string): Promise<ResourceAssignmentDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Assignment,
      ResourceAssignmentDto,
    );
  }

  async create(dto: CreateAssignmentDto): Promise<ResourceAssignmentDto> {
    return this._mapper.map(
      await this._repo.create(new this._assignmentModel(dto)),
      Assignment,
      ResourceAssignmentDto,
    );
  }

  async update(dto: UpdateAssignmentDto): Promise<ResourceAssignmentDto> {
    return this._mapper.map(
      await this._repo.update(new this._assignmentModel(dto)),
      Assignment,
      ResourceAssignmentDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}
