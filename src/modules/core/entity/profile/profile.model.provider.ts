import { Connection } from "mongoose";
import { Profile, ProfileSchema } from "./profile.schema";

export const ProfileModels = {
    profile: {
      provide: 'PROFILE_MODEL',
      useFactory: async (tenantConnection: Connection) => {
        return tenantConnection.model(Profile.name, ProfileSchema);
      },
      inject: ['TENANT_CONNECTION'],
    },
  };
