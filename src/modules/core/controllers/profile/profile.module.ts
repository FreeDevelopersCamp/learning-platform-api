import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from '../../services/profile/profile.service';
import { ProfileModels } from '../../entity/profile/profile.model.provider';
import { ProfileProfile } from '../../entity/profile/profile.mapper';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, ProfileModels.profile, ProfileProfile],
})
export class ProfileModule {}
