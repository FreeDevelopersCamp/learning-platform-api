import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Owner } from '../../entity/owner/owner.schema';
import { ResourceOwnerDto } from '../../dto/owner/resource.owner';
import { CreateOwnerDto } from '../../dto/owner/create.owner';
import { UpdateOwnerDto } from '../../dto/owner/update.owner';
import { UserService } from '../user/user.service';

@Injectable()
export class OwnerService {
  private readonly _repo: IMongoRepository<Owner>;

  constructor(
    @Inject('OWNER_MODEL') private _ownerModel: Model<Owner>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
  ) {
    this._repo = new MongoRepository<Owner>(_ownerModel);
  }

  async list(): Promise<ResourceOwnerDto[]> {
    const owners = await this._repo.findAll();

    const ownersDto = await Promise.all(
      owners.map(async (entity) => {
        return this.getById.call(this, entity._id.toString());
      }),
    );
    return ownersDto;
  }

  async getById(id: string): Promise<ResourceOwnerDto> {
    const entity = await this._repo.findOne(id);
    return this.toDto(entity);
  }

  async create(dto: CreateOwnerDto): Promise<ResourceOwnerDto> {
    const entity = await this._repo.create(new this._ownerModel(dto));
    return this.getById(entity._id.toString());
  }

  async update(dto: UpdateOwnerDto): Promise<ResourceOwnerDto> {
    const entity = await this._repo.update(new this._ownerModel(dto));
    return this.getById(entity._id.toString());
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.getById(id);

    if (entity.user.roles.length === 1) {
      await this._userService.delete(entity.user._id);
    }

    return await this._repo.delete(id);
  }

  private async toDto(entity: Owner): Promise<ResourceOwnerDto> {
    const dto = new ResourceOwnerDto();
    dto._id = entity._id.toString();
    dto.status = entity.status;
    dto.user = await this._userService.getById(entity.userId.toString());
    return dto;
  }
}
