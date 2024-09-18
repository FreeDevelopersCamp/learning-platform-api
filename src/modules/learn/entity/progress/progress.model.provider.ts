import { Connection } from 'mongoose';
import { Progress, ProgressSchema } from './progress.schema';

export const ProgressModels = {
  progress: {
    provide: 'PROGRESS_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Progress.name, ProgressSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
