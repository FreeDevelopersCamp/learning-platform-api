import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Roadmap } from '../../entity/roadmap/roadmap.schema';
import { ResourceRoadmapDto } from '../../dto/roadmap/resource.roadmap';
import { CreateRoadmapDto } from '../../dto/roadmap/create.roadmap';
import { UpdateRoadmapDto } from '../../dto/roadmap/update.roadmap';

@Injectable()
export class RoadmapService {
  private readonly _repo: IMongoRepository<Roadmap>;

  constructor(
    @Inject('ROADMAP_MODEL') private _roadmapModel: Model<Roadmap>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Roadmap>(_roadmapModel);
  }

  async list(): Promise<ResourceRoadmapDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Roadmap,
      ResourceRoadmapDto,
    );
  }

  async getById(id: string): Promise<ResourceRoadmapDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Roadmap,
      ResourceRoadmapDto,
    );
  }

  async create(dto: CreateRoadmapDto): Promise<ResourceRoadmapDto> {
    return this._mapper.map(
      await this._repo.create(new this._roadmapModel(dto)),
      Roadmap,
      ResourceRoadmapDto,
    );
  }

  async update(dto: UpdateRoadmapDto): Promise<ResourceRoadmapDto> {
    return this._mapper.map(
      await this._repo.update(new this._roadmapModel(dto)),
      Roadmap,
      ResourceRoadmapDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}
