import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Profile } from '../../entity/profile/profile.schema';
import { ResourceProfileDto } from '../../dto/profile/resource.profile';
import { CreateProfileDto } from '../../dto/profile/create.profile';
import { UpdateProfileDto } from '../../dto/profile/update.profile';

@Injectable()
export class ProfileService {
  private readonly _repo: IMongoRepository<Profile>;

  constructor(
    @Inject('PROFILE_MODEL') private _profileModel: Model<Profile>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Profile>(_profileModel);
  }

  async list(): Promise<ResourceProfileDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Profile,
      ResourceProfileDto,
    );
  }

  async getById(id: string): Promise<ResourceProfileDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Profile,
      ResourceProfileDto,
    );
  }

  async create(dto: CreateProfileDto): Promise<ResourceProfileDto> {
    return this._mapper.map(
      await this._repo.create(new this._profileModel(dto)),
      Profile,
      ResourceProfileDto,
    );
  }

  async update(dto: UpdateProfileDto): Promise<ResourceProfileDto> {
    return this._mapper.map(
      await this._repo.update(new this._profileModel(dto)),
      Profile,
      ResourceProfileDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}
