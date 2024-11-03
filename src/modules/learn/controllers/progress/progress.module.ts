import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from '../../services/progress/progress.service';
import { ProgressModels } from '../../entity/progress/progress.model.provider';
import { ProgressProfile } from '../../entity/progress/progress.mapper';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { CourseModule } from '../course/course.module';
import { RoadmapModule } from '../roadmap/roadmap.module';
import { PracticeModule } from '../practice/practice.module';
import { ProjectModule } from '../project/project.module';
import { AssignmentModule } from '../assignment/assignment.module';
import { CertificationModule } from '../certification/certification.module';
import { TutorialModule } from '../tutorial/tutorial.module';

@Module({
  imports: [
    GuardsModule,
    CourseModule,
    RoadmapModule,
    PracticeModule,
    ProjectModule,
    AssignmentModule,
    CertificationModule,
    TutorialModule,
  ],
  // imports: [GuardsModule],  // Uncomment this line if you want to use guards on the controller level.
  controllers: [ProgressController],
  providers: [ProgressService, ProgressModels.progress, ProgressProfile],
  exports: [ProgressService],
})
export class ProgressModule {}
