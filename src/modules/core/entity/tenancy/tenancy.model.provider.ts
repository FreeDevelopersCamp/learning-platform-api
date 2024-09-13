import { Connection } from 'mongoose';
import { Tenancy, TenancySchema } from './tenancy.schema';

export const TenancyModels = {
  tenancy: {
    provide: 'TENANCY_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Tenancy.name, TenancySchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
