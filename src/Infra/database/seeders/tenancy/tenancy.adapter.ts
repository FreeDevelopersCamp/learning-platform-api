import { Tenancy } from 'src/modules/core/entity/tenancy/tenancy.schema';
import { IMongoRepository } from '../../repository/adapter';

export abstract class ISeedTenancyRepository extends IMongoRepository<Tenancy> {
  abstract seed(): Promise<void>;
}
