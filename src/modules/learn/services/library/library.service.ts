import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Library } from '../../entity/library/library.schema';
import { ResourceLibraryDto } from '../../dto/library/resource.library';
import { CreateLibraryDto } from '../../dto/library/create.library';
import { UpdateLibraryDto } from '../../dto/library/update.library';

@Injectable()
export class LibraryService {
  private readonly _repo: IMongoRepository<Library>;

  constructor(
    @Inject('LIBRARY_MODEL') private _libraryModel: Model<Library>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Library>(_libraryModel);
  }

  async list(): Promise<ResourceLibraryDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Library,
      ResourceLibraryDto,
    );
  }

  async getById(id: string): Promise<ResourceLibraryDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Library,
      ResourceLibraryDto,
    );
  }

  async create(dto: CreateLibraryDto): Promise<ResourceLibraryDto> {
    return this._mapper.map(
      await this._repo.create(new this._libraryModel(dto)),
      Library,
      ResourceLibraryDto,
    );
  }

  async update(dto: UpdateLibraryDto): Promise<ResourceLibraryDto> {
    return this._mapper.map(
      await this._repo.update(new this._libraryModel(dto)),
      Library,
      ResourceLibraryDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}

