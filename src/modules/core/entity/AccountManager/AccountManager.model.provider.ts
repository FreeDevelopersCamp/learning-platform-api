import { Connection } from 'mongoose';
import { AccountManager, AccountManagerSchema } from './AccountManager.schema';

export const AccountManagerModels = {
  AccountManager: {
    provide: 'ACCOUNTMANAGER_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(AccountManager.name, AccountManagerSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
