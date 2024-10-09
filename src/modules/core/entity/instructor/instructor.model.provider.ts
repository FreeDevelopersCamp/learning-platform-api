import { Connection } from 'mongoose';
import { Instructor, InstructorSchema } from './instructor.schema';

export const InstructorModels = {
  instructor: {
    provide: 'INSTRUCTOR_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Instructor.name, InstructorSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
