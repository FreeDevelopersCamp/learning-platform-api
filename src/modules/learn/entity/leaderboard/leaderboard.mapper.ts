import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Leaderboard } from './Leaderboard.schema';
import { LeaderboardDto } from '../../dto/leaderboard/leaderboard';
import { ResourceLeaderboardDto } from '../../dto/leaderboard/resource.leaderboard';
import { CreateLeaderboardDto } from '../../dto/leaderboard/create.leaderboard';
import { UpdateLeaderboardDto } from '../../dto/leaderboard/update.leaderboard';
import { Types } from 'mongoose';

export class LeaderboardProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
      }
    
      override get profile() {
        return (mapper) => {
          createMap(mapper, LeaderboardDto, Leaderboard);
          createMap(mapper, Leaderboard, LeaderboardDto);

          createMap(
            mapper,
            ResourceLeaderboardDto,
            Leaderboard,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => new Types.ObjectId(src._id)),
            ),
          );
          createMap(
            mapper,
            Leaderboard,
            ResourceLeaderboardDto,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => src._id.toString()),
            ),
          );

          createMap(mapper, ResourceLeaderboardDto, LeaderboardDto);
          createMap(mapper, LeaderboardDto, ResourceLeaderboardDto);
    
          createMap(mapper, ResourceLeaderboardDto, CreateLeaderboardDto);
          createMap(mapper, CreateLeaderboardDto, ResourceLeaderboardDto);
    
          createMap(mapper, ResourceLeaderboardDto, UpdateLeaderboardDto);
          createMap(mapper, UpdateLeaderboardDto, ResourceLeaderboardDto);
        };
      }
}
