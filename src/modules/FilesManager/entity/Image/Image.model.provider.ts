import { Connection } from "mongoose";
import { Image, ImageSchema } from "./Image.schema";

export const ImageModels = {
    Image: {
      provide: 'IMAGE_MODEL',
      useFactory: async (tenantConnection: Connection) => {
        return tenantConnection.model(Image.name, ImageSchema);
      },
      inject: ['TENANT_CONNECTION'],
    },
  };
