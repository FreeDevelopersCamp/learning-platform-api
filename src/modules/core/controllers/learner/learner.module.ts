import { Module } from '@nestjs/common';
import { LearnerController } from './learner.controller';
import { LearnerService } from '../../services/learner/learner.service';
import { LearnerModels } from '../../entity/learner/learner.model.provider';
import { LearnerProfile } from '../../entity/learner/learner.mapper';

@Module({
  controllers: [LearnerController],
  providers: [LearnerService, LearnerModels.learner, LearnerProfile],
  exports: [LearnerService],
})
export class LearnerModule {}
