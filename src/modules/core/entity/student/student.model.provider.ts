import { Connection } from "mongoose";
import { Student, StudentSchema } from "./student.schema";

export const StudentModels = {
    student: {
      provide: 'STUDENT_MODEL',
      useFactory: async (tenantConnection: Connection) => {
        return tenantConnection.model(Student.name, StudentSchema);
      },
      inject: ['TENANT_CONNECTION'],
    },
  };
