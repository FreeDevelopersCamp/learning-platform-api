import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller';
import { RoadmapService } from '../../services/roadmap/roadmap.service';
import { RoadmapModels } from '../../entity/roadmap/roadmap.model.provider';
import { RoadmapProfile } from '../../entity/roadmap/roadmap.mapper';

@Module({
  controllers: [RoadmapController],
  providers: [RoadmapService, RoadmapModels.roadmap, RoadmapProfile],
})
export class RoadmapModule {}
