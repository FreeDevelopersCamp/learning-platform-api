import { Module } from '@nestjs/common';
import { TutorialController } from './tutorial.controller';
import { TutorialService } from '../../services/tutorial/tutorial.service';
import { TutorialModels } from '../../entity/tutorial/tutorial.model.provider';
import { TutorialProfile } from '../../entity/tutorial/tutorial.mapper';

@Module({
  controllers: [TutorialController],
  providers: [TutorialService, TutorialModels.tutorial, TutorialProfile],
})
export class TutorialModule {}
