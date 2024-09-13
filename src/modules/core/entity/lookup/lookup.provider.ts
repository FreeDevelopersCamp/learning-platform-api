import { Connection } from 'mongoose';
import { Lookup, LookupSchema } from './lookup.schema';

export const lookupModels = {
  lookup: {
    provide: 'LOOKUP_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Lookup.name, LookupSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
