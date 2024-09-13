import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { MongoRepository } from 'src/infra/database/repository/mongo-repository';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { System } from 'src/infra/system/system.constant';
import { CreateTenancyDto } from '../../dto/tenancy/create.tenancy';
import { ResourceTenancyDto } from '../../dto/tenancy/resource.tenancy';
import { Tenancy } from '../../entity/tenancy/tenancy.schema';
import { LookupService } from '../lookup/lookup.service';
import { dummyUsers } from '../user/dummy.users.constants';
import { AuthenticationService } from 'src/modules/authentication/service/authentication.service';

@Injectable()
export class TenancyService {
  private readonly _tenancyRepo: IMongoRepository<Tenancy>;

  constructor(
    @Inject('TENANCY_MODEL') private _tenancyModel: Model<Tenancy>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _auth: AuthenticationService,
    private readonly _lookupService: LookupService,
  ) {
    this._tenancyRepo = new MongoRepository<Tenancy>(_tenancyModel);
  }

  async list(): Promise<ResourceTenancyDto[]> {
    const tenanciesDto = this._mapper.mapArray(
      await this._tenancyRepo.findAll(),
      Tenancy,
      ResourceTenancyDto,
    );
    return tenanciesDto;
  }

  async getById(id: string): Promise<ResourceTenancyDto> {
    return this._mapper.map(
      await this._tenancyRepo.findOne(id),
      Tenancy,
      ResourceTenancyDto,
    );
  }

  async create(dto: CreateTenancyDto): Promise<ResourceTenancyDto> {
    const createResult = this._mapper.map(
      await this._tenancyRepo.create(new this._tenancyModel(dto)),
      Tenancy,
      ResourceTenancyDto,
    );

    System.tenancies.push(createResult);
    let tenant = System.tenancies.find((a) => a.alias == dto.alias);

    await this._lookupService.setConnection(tenant);
    await this._lookupService.seed();

    dto.user.roles = ['1'];
    await Promise.all([
      await this._auth.setConnection(tenant),
      await this._auth.register(dto.user),
    ]);

    dummyUsers.forEach(async (user: any) => {
      await this._auth.register(user);
    });

    return createResult;
  }

  async update(dto: ResourceTenancyDto): Promise<ResourceTenancyDto> {
    return this._mapper.map(
      await this._tenancyRepo.update(new this._tenancyModel(dto)),
      Tenancy,
      ResourceTenancyDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._tenancyRepo.delete(id);
  }
}
