import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from '../../services/progress/progress.service';
import { ProgressModels } from '../../entity/progress/progress.model.provider';
import { ProgressProfile } from '../../entity/progress/progress.mapper';

@Module({
  controllers: [
    ProgressController
  ],
  providers: [
    ProgressService,
    ProgressModels.progress,
    ProgressProfile
  ]
})
export class ProgressModule {}
