import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from '../../services/track/track.service';
import { TrackModels } from '../../entity/track/track.model.provider';
import { TrackProfile } from '../../entity/track/track.mapper';

@Module({
  controllers: [
    TrackController
  ],
  providers: [
    TrackService,
    TrackModels.track,
    TrackProfile
  ]
})
export class TrackModule {}
