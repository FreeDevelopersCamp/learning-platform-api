import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller';
import { RoadmapService } from '../../services/roadmap/roadmap.service';
import { RoadmapModels } from '../../entity/roadmap/roadmap.model.provider';
import { RoadmapProfile } from '../../entity/roadmap/roadmap.mapper';
import { CourseModule } from '../course/course.module';
import { ProjectModule } from '../project/project.module';
import { AssignmentModule } from '../assignment/assignment.module';

@Module({
  imports: [CourseModule, ProjectModule, AssignmentModule],
  controllers: [RoadmapController],
  providers: [RoadmapService, RoadmapModels.roadmap, RoadmapProfile],
  exports: [RoadmapService, RoadmapProfile, RoadmapModels.roadmap],
})
export class RoadmapModule {}
