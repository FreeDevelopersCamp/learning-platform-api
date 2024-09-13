import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../../services/user/user.service';
import { UserModels } from '../../entity/user/user.model.provider';
import { UserProfile } from '../../entity/user/user.mapper';
import { ISeedUserRepository } from 'src/infra/database/seeders/user/user.adapter';
import { SeedUserRepository } from 'src/Infra/database/seeders/user/user.repository';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { MongooseConnectionService } from 'src/Infra/database/Service/mongoose.connection.service';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';

@Module({
  imports: [GuardsModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserModels.user,
    PaginationService,
    UserProfile,
    {
      provide: ISeedUserRepository,
      useClass: SeedUserRepository,
    },
    MongooseConnectionService,
  ],
  exports: [UserProfile, UserService, ISeedUserRepository],
})
export class UserModule {}
