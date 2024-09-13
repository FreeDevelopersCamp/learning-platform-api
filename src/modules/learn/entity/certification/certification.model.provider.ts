import { Connection } from "mongoose";
import { Certification, CertificationSchema } from "./certification.schema";

export const CertificationModels = {
    certification: {
      provide: 'CERTIFICATION_MODEL',
      useFactory: async (tenantConnection: Connection) => {
        return tenantConnection.model(Certification.name, CertificationSchema);
      },
      inject: ['TENANT_CONNECTION'],
    },
  };
