import { Connection } from "mongoose";
import { Assignment, AssignmentSchema } from "./assignment.schema";

export const AssignmentModels = {
    assignment: {
      provide: 'ASSIGNMENT_MODEL',
      useFactory: async (tenantConnection: Connection) => {
        return tenantConnection.model(Assignment.name, AssignmentSchema);
      },
      inject: ['TENANT_CONNECTION'],
    },
  };
