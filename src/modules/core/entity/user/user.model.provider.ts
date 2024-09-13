import { Connection } from 'mongoose';
import { User, UserSchema } from './user.schema';

export const UserModels = {
  user: {
    provide: 'USER_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(User.name, UserSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
