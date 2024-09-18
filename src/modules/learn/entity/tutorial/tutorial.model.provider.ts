import { Connection } from 'mongoose';
import { Tutorial, TutorialSchema } from './tutorial.schema';

export const TutorialModels = {
  tutorial: {
    provide: 'TUTORIAL_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Tutorial.name, TutorialSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
