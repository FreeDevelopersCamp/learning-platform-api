import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Track } from '../../entity/track/track.schema';
import { ResourceTrackDto } from '../../dto/track/resource.track';
import { CreateTrackDto } from '../../dto/track/create.track';
import { UpdateTrackDto } from '../../dto/track/update.track';

@Injectable()
export class TrackService {
  private readonly _repo: IMongoRepository<Track>;

  constructor(
    @Inject('TRACK_MODEL') private _trackModel: Model<Track>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Track>(_trackModel);
  }

  async list(): Promise<ResourceTrackDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Track,
      ResourceTrackDto,
    );
  }

  async getById(id: string): Promise<ResourceTrackDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Track,
      ResourceTrackDto,
    );
  }

  async create(dto: CreateTrackDto): Promise<ResourceTrackDto> {
    return this._mapper.map(
      await this._repo.create(new this._trackModel(dto)),
      Track,
      ResourceTrackDto,
    );
  }

  async update(dto: UpdateTrackDto): Promise<ResourceTrackDto> {
    return this._mapper.map(
      await this._repo.update(new this._trackModel(dto)),
      Track,
      ResourceTrackDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}
