import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Leaderboard } from '../../entity/leaderboard/leaderboard.schema';
import { ResourceLeaderboardDto } from '../../dto/leaderboard/resource.leaderboard';
import { CreateLeaderboardDto } from '../../dto/leaderboard/create.leaderboard';
import { UpdateLeaderboardDto } from '../../dto/leaderboard/update.leaderboard';

@Injectable()
export class LeaderboardService {
  private readonly _repo: IMongoRepository<Leaderboard>;

  constructor(
    @Inject('LEADERBOARD_MODEL') private _leaderboardModel: Model<Leaderboard>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Leaderboard>(_leaderboardModel);
  }

  async list(): Promise<ResourceLeaderboardDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Leaderboard,
      ResourceLeaderboardDto,
    );
  }

  async getById(id: string): Promise<ResourceLeaderboardDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Leaderboard,
      ResourceLeaderboardDto,
    );
  }

  async create(dto: CreateLeaderboardDto): Promise<ResourceLeaderboardDto> {
    return this._mapper.map(
      await this._repo.create(new this._leaderboardModel(dto)),
      Leaderboard,
      ResourceLeaderboardDto,
    );
  }

  async update(dto: UpdateLeaderboardDto): Promise<ResourceLeaderboardDto> {
    return this._mapper.map(
      await this._repo.update(new this._leaderboardModel(dto)),
      Leaderboard,
      ResourceLeaderboardDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}

