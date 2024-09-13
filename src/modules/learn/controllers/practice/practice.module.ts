import { Module } from '@nestjs/common';
import { PracticeController } from './practice.controller';
import { PracticeService } from '../../services/practice/practice.service';
import { PracticeModels } from '../../entity/practice/practice.model.provider';
import { PracticeProfile } from '../../entity/practice/practice.mapper';

@Module({
  controllers: [
    PracticeController
  ],
  providers: [
    PracticeService,
    PracticeModels.practice,
    PracticeProfile
  ]
})
export class PracticeModule {}
