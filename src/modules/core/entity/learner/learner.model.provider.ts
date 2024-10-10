import { Connection } from 'mongoose';
import { Learner, LearnerSchema } from './learner.schema';

export const LearnerModels = {
  learner: {
    provide: 'LEARNER_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Learner.name, LearnerSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
