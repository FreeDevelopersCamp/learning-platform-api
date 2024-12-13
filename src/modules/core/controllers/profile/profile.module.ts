import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from '../../services/profile/profile.service';
import { ProfileModels } from '../../entity/profile/profile.model.provider';
import { ProfileProfile } from '../../entity/profile/profile.mapper';
import { UserModule } from '../user/user.module';
import { CertificationModule } from 'src/modules/learn/controllers/certification/certification.module';
import { CourseModule } from 'src/modules/learn/controllers/course/course.module';
import { ProjectModule } from 'src/modules/learn/controllers/project/project.module';
import { RoadmapModule } from 'src/modules/learn/controllers/roadmap/roadmap.module';

@Module({
  imports: [
    UserModule,
    CertificationModule,
    CourseModule,
    ProjectModule,
    RoadmapModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileModels.profile, ProfileProfile],
  exports: [ProfileModule, ProfileService]
})
export class ProfileModule {}
