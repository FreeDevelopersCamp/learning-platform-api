import { LeaderboardDto } from './leaderboard';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceLeaderboardDto extends LeaderboardDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
