import { RoadmapModule } from './controllers/roadmap/roadmap.module';
import { CourseModule } from './controllers/course/course.module';
import { ProgressModule } from './controllers/progress/progress.module';
import { LibraryModule } from './controllers/library/library.module';
import { LeaderboardModule } from './controllers/leaderboard/leaderboard.module';
import { AssignmentModule } from './controllers/assignment/assignment.module';
import { ProjectModule } from './controllers/project/project.module';
import { TutorialModule } from './controllers/tutorial/tutorial.module';
import { PracticeModule } from './controllers/practice/practice.module';
import { Module } from '@nestjs/common';
import { CertificationModule } from './controllers/certification/certification.module';

@Module({
  imports: [
    CourseModule,
    PracticeModule,
    RoadmapModule,
    ProgressModule,
    LibraryModule,
    LeaderboardModule,
    AssignmentModule,
    ProjectModule,
    TutorialModule,
    CertificationModule,
  ],
})
export class LearnModule {}
