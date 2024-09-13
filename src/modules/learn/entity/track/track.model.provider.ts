import { Connection } from "mongoose";
import { Track, TrackSchema } from "./track.schema";

export const TrackModels = {
    track: {
      provide: 'TRACK_MODEL',
      useFactory: async (tenantConnection: Connection) => {
        return tenantConnection.model(Track.name, TrackSchema);
      },
      inject: ['TENANT_CONNECTION'],
    },
  };
