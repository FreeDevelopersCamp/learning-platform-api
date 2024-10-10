import { Connection } from 'mongoose';
import { Manager, ManagerSchema } from './manager.schema';

export const ManagerModels = {
  manager: {
    provide: 'MANAGER_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Manager.name, ManagerSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
