import { User } from 'src/modules/core/entity/user/user.schema';
import { IMongoRepository } from '../../repository/adapter';

export abstract class ISeedUserRepository extends IMongoRepository<User> {
  abstract seed(): Promise<void>;
}
