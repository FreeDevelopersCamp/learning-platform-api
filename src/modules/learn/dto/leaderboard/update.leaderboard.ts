import { LeaderboardDto } from "./leaderboard";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateLeaderboardDto extends LeaderboardDto {
    @ApiProperty({ default: '' })
    @AutoMap()
    _id: string;
}
