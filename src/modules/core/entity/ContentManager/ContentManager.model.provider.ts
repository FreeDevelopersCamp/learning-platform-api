import { Connection } from 'mongoose';
import { ContentManager, ContentManagerSchema } from './ContentManager.schema';

export const ContentManagerModels = {
  ContentManager: {
    provide: 'CONTENTMANAGER_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(ContentManager.name, ContentManagerSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
