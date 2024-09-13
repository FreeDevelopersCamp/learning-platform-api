import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Track } from './Track.schema';
import { TrackDto } from '../../dto/track/track';
import { ResourceTrackDto } from '../../dto/track/resource.track';
import { CreateTrackDto } from '../../dto/track/create.track';
import { UpdateTrackDto } from '../../dto/track/update.track';
import { Types } from 'mongoose';

export class TrackProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
      }
    
      override get profile() {
        return (mapper) => {
          createMap(mapper, TrackDto, Track);
          createMap(mapper, Track, TrackDto);

          createMap(
            mapper,
            ResourceTrackDto,
            Track,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => new Types.ObjectId(src._id)),
            ),
          );
          createMap(
            mapper,
            Track,
            ResourceTrackDto,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => src._id.toString()),
            ),
          );

          createMap(mapper, ResourceTrackDto, TrackDto);
          createMap(mapper, TrackDto, ResourceTrackDto);
    
          createMap(mapper, ResourceTrackDto, CreateTrackDto);
          createMap(mapper, CreateTrackDto, ResourceTrackDto);
    
          createMap(mapper, ResourceTrackDto, UpdateTrackDto);
          createMap(mapper, UpdateTrackDto, ResourceTrackDto);
        };
      }
}
