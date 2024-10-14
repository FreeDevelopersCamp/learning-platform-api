import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Learner } from '../../entity/learner/learner.schema';
import { ResourceLearnerDto } from '../../dto/learner/resource.learner';
import { CreateLearnerDto } from '../../dto/learner/create.learner';
import { UpdateLearnerDto } from '../../dto/learner/update.learner';
import { UserService } from '../user/user.service';

@Injectable()
export class LearnerService {
  private readonly _repo: IMongoRepository<Learner>;

  constructor(
    @Inject('LEARNER_MODEL') private _learnerModel: Model<Learner>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
  ) {
    this._repo = new MongoRepository<Learner>(_learnerModel);
  }

  async list(): Promise<ResourceLearnerDto[]> {
    const entities = await this._repo.findAll();

    return await Promise.all(
      entities.map((entity) => {
        return this.getById.call(this, entity._id.toString());
      }),
    );
  }

  async getById(id: string): Promise<ResourceLearnerDto> {
    const entity = await this._repo.findOne(id);
    return this.toDto(entity);
  }

  async create(dto: CreateLearnerDto): Promise<ResourceLearnerDto> {
    const entity = await this._repo.create(new this._learnerModel(dto));
    return this.getById(entity._id.toString());
  }

  async update(dto: UpdateLearnerDto): Promise<ResourceLearnerDto> {
    const entity = await this._repo.update(new this._learnerModel(dto));
    return this.getById(entity._id.toString());
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.getById(id);

    if (entity.user.roles.length === 1) {
      await this._userService.delete(entity.user._id);
    } else {
      entity.user.roles = entity.user.roles.filter((role) => role !== '3');
      await this._userService.update(entity.user);
    }

    return await this._repo.delete(id);
  }

  private async toDto(entity: Learner): Promise<ResourceLearnerDto> {
    const dto = new ResourceLearnerDto();
    dto._id = entity._id.toString();
    dto.user = await this._userService.getById(entity.userId);

    return dto;
  }
}
