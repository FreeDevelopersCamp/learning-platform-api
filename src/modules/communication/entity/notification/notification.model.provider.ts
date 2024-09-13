import { Connection } from 'mongoose';
import { Notification, NotificationSchema } from './notification.schema';

export const NotificationModels = {
  notification: {
    provide: 'NOTIFICATION_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Notification.name, NotificationSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
