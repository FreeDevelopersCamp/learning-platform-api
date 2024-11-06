import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller';
import { RoadmapService } from '../../services/roadmap/roadmap.service';
import { RoadmapModels } from '../../entity/roadmap/roadmap.model.provider';
import { RoadmapProfile } from '../../entity/roadmap/roadmap.mapper';
import { CourseModule } from '../course/course.module';
import { ProjectModule } from '../project/project.module';
import { PracticeModule } from '../practice/practice.module';

@Module({
  imports: [CourseModule, ProjectModule, PracticeModule],
  controllers: [RoadmapController],
  providers: [RoadmapService, RoadmapModels.roadmap, RoadmapProfile],
  exports: [RoadmapService, RoadmapProfile, RoadmapModels.roadmap],
})
export class RoadmapModule {}
