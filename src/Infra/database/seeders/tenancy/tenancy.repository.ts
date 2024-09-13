import { Tenancy } from 'src/modules/core/entity/tenancy/tenancy.schema';
import { ISeedTenancyRepository } from './tenancy.adapter';
import { Global, Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from '../../repository/mongo-repository';
import { Model } from 'mongoose';
import { System } from 'src/infra/system/system.constant';
import { ResourceTenancyDto } from 'src/modules/core/dto/tenancy/resource.tenancy';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { tenancyConstant } from './tenancy.constant';

@Global()
@Injectable()
export class SeedTenancyRepository
  extends MongoRepository<Tenancy>
  implements ISeedTenancyRepository
{
  constructor(
    @Inject('TENANCY_MODEL') private readonly _tenancyModel: Model<Tenancy>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    super(_tenancyModel);
  }

  async seed(): Promise<void> {
    const tenancies = this._mapper.mapArray(
      await this.findAll(),
      Tenancy,
      ResourceTenancyDto,
    );

    if (
      tenancies.length === 0 ||
      !tenancies.find((a) => a.alias == tenancyConstant.alias)
    ) {
      const entity = new this._tenancyModel(tenancyConstant);
      await this.create(entity);
      System.tenancies.push(
        this._mapper.map(entity, Tenancy, ResourceTenancyDto),
      );
      return;
    }

    System.tenancies = tenancies;
  }
}
