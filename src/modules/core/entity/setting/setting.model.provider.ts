import { Connection } from 'mongoose';
import { Setting, SettingSchema } from './setting.schema';

export const SettingModels = {
  setting: {
    provide: 'SETTING_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Setting.name, SettingSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
