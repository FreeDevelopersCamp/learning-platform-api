import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../../services/user/user.service';
import { UserModels } from '../../entity/user/user.model.provider';
import { UserProfile } from '../../entity/user/user.mapper';

@Module({
  controllers: [UserController],
  providers: [UserService, UserModels.user, UserProfile],
})
export class UserModule {}
