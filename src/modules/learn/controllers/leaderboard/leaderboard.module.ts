import { Module } from '@nestjs/common';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from '../../services/leaderboard/leaderboard.service';
import { LeaderboardModels } from '../../entity/leaderboard/leaderboard.model.provider';
import { LeaderboardProfile } from '../../entity/leaderboard/leaderboard.mapper';

@Module({
  controllers: [
    LeaderboardController
  ],
  providers: [
    LeaderboardService,
    LeaderboardModels.leaderboard,
    LeaderboardProfile
  ]
})
export class LeaderboardModule {}
