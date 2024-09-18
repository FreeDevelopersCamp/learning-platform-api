import { Connection } from 'mongoose';
import { Leaderboard, LeaderboardSchema } from './leaderboard.schema';

export const LeaderboardModels = {
  leaderboard: {
    provide: 'LEADERBOARD_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Leaderboard.name, LeaderboardSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
