import { Connection } from 'mongoose';
import { Roadmap, RoadmapSchema } from './roadmap.schema';

export const RoadmapModels = {
  roadmap: {
    provide: 'ROADMAP_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Roadmap.name, RoadmapSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
