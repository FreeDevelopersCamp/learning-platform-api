import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller';
import { RoadmapService } from '../../services/roadmap/roadmap.service';
import { RoadmapModels } from '../../entity/roadmap/roadmap.model.provider';
import { RoadmapProfile } from '../../entity/roadmap/roadmap.mapper';
import { CourseModule } from '../course/course.module';
import { ProjectModule } from '../project/project.module';
import { PracticeModule } from '../practice/practice.module';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { UserModule } from 'src/modules/core/controllers/user/user.module';
import { AdminModule } from 'src/modules/core/controllers/admin/admin.module';
import { OwnerModule } from 'src/modules/core/controllers/owner/owner.module';
import { ManagerModule } from 'src/modules/core/controllers/manager/manager.module';
import { AccountManagerModule } from 'src/modules/core/controllers/AccountManager/AccountManager.module';
import { ContentManagerModule } from 'src/modules/core/controllers/ContentManager/ContentManager.module';
import { InstructorModule } from 'src/modules/core/controllers/instructor/instructor.module';
import { ExamModule } from '../exam/exam.module';
import { CertificationModule } from '../certification/certification.module';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';

@Module({
  imports: [
    GuardsModule,
    UserModule,
    AdminModule,
    OwnerModule,
    ManagerModule,
    AccountManagerModule,
    ContentManagerModule,
    InstructorModule,
    CourseModule,
    PracticeModule,
    ProjectModule,
    ExamModule,
    CertificationModule,
  ],
  controllers: [RoadmapController],
  providers: [
    RoadmapService,
    RoadmapModels.roadmap,
    RoadmapProfile,
    PaginationService,
  ],
  exports: [RoadmapService, RoadmapProfile, RoadmapModels.roadmap],
})
export class RoadmapModule {}
