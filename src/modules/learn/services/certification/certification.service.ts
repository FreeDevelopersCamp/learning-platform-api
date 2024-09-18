import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Certification } from '../../entity/certification/certification.schema';
import { ResourceCertificationDto } from '../../dto/certification/resource.certification';
import { CreateCertificationDto } from '../../dto/certification/create.certification';
import { UpdateCertificationDto } from '../../dto/certification/update.certification';

@Injectable()
export class CertificationService {
  private readonly _repo: IMongoRepository<Certification>;

  constructor(
    @Inject('CERTIFICATION_MODEL')
    private _certificationModel: Model<Certification>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Certification>(_certificationModel);
  }

  async list(): Promise<ResourceCertificationDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Certification,
      ResourceCertificationDto,
    );
  }

  async getById(id: string): Promise<ResourceCertificationDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Certification,
      ResourceCertificationDto,
    );
  }

  async create(dto: CreateCertificationDto): Promise<ResourceCertificationDto> {
    return this._mapper.map(
      await this._repo.create(new this._certificationModel(dto)),
      Certification,
      ResourceCertificationDto,
    );
  }

  async update(dto: UpdateCertificationDto): Promise<ResourceCertificationDto> {
    return this._mapper.map(
      await this._repo.update(new this._certificationModel(dto)),
      Certification,
      ResourceCertificationDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}
