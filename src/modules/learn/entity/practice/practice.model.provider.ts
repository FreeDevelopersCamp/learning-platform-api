import { Connection } from "mongoose";
import { Practice, PracticeSchema } from "./practice.schema";

export const PracticeModels = {
    practice: {
      provide: 'PRACTICE_MODEL',
      useFactory: async (tenantConnection: Connection) => {
        return tenantConnection.model(Practice.name, PracticeSchema);
      },
      inject: ['TENANT_CONNECTION'],
    },
  };
