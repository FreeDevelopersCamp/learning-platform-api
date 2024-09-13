import { Connection } from "mongoose";
import { Library, LibrarySchema } from "./library.schema";

export const LibraryModels = {
    library: {
      provide: 'LIBRARY_MODEL',
      useFactory: async (tenantConnection: Connection) => {
        return tenantConnection.model(Library.name, LibrarySchema);
      },
      inject: ['TENANT_CONNECTION'],
    },
  };
