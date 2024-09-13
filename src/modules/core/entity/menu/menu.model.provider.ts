import { Connection } from 'mongoose';
import { Menu, MenuSchema } from './menu.schema';

export const MenuModels = {
  menu: {
    provide: 'MENU_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Menu.name, MenuSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
