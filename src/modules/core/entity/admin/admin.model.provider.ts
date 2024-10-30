import { Connection } from 'mongoose';
import { Admin, AdminSchema } from './admin.schema';

export const AdminModels = {
  admin: {
    provide: 'ADMIN_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Admin.name, AdminSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
