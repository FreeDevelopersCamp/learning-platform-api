import { Connection } from 'mongoose';
import { Email, EmailSchema } from './email.schema';

export const EmailModels = {
  email: {
    provide: 'EMAIL_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Email.name, EmailSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
