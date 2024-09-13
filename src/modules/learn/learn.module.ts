import { CourseModule } from './controllers/course/course.module';
import { ProgressModule } from './controllers/progress/progress.module';
import { TrackModule } from './controllers/track/track.module';
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
    ProgressModule,
    TrackModule,
    LibraryModule,
    LeaderboardModule,
    AssignmentModule,
    ProjectModule,
    TutorialModule,
    PracticeModule,
        CertificationModule,
    ],
})
export class LearnModule {}
