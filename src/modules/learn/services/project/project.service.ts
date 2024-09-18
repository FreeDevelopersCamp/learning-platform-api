import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Project } from '../../entity/project/project.schema';
import { ResourceProjectDto } from '../../dto/project/resource.project';
import { CreateProjectDto } from '../../dto/project/create.project';
import { UpdateProjectDto } from '../../dto/project/update.project';

@Injectable()
export class ProjectService {
  private readonly _repo: IMongoRepository<Project>;

  constructor(
    @Inject('PROJECT_MODEL') private _projectModel: Model<Project>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Project>(_projectModel);
  }

  async list(): Promise<ResourceProjectDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Project,
      ResourceProjectDto,
    );
  }

  async getById(id: string): Promise<ResourceProjectDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Project,
      ResourceProjectDto,
    );
  }

  async create(dto: CreateProjectDto): Promise<ResourceProjectDto> {
    return this._mapper.map(
      await this._repo.create(new this._projectModel(dto)),
      Project,
      ResourceProjectDto,
    );
  }

  async update(dto: UpdateProjectDto): Promise<ResourceProjectDto> {
    return this._mapper.map(
      await this._repo.update(new this._projectModel(dto)),
      Project,
      ResourceProjectDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}
