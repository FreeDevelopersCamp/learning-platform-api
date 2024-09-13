import { Global, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from '../../repository/mongo-repository';
import { ISeedUserRepository } from './user.adapter';
import { UserConstant } from './user.constant';
import configurations from 'src/config/configurations';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/core/entity/user/user.schema';

@Global()
@Injectable()
export class SeedUserRepository
  extends MongoRepository<User>
  implements ISeedUserRepository
{
  constructor(@Inject('USER_MODEL') private readonly _userModel: Model<User>) {
    super(_userModel);
  }

  async seed(): Promise<void> {
    const user = (await this.findAll()).find(
      (a) => a.userName == UserConstant.userName,
    );

    if (!user) {
      const userAdmin = UserConstant;
      userAdmin.password = await bcrypt.hash(
        userAdmin.password,
        configurations().security.saltrounds,
      );
      const entity = new this._userModel(userAdmin);
      this.create(entity);
    }
  }
}
