import { Connection } from 'mongoose';
import { Owner, OwnerSchema } from './owner.schema';

export const OwnerModels = {
  owner: {
    provide: 'OWNER_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Owner.name, OwnerSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
