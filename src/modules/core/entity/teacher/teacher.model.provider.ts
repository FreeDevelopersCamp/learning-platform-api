import { Connection } from 'mongoose';
import { Teacher, TeacherSchema } from './teacher.schema';

export const TeacherModels = {
  teacher: {
    provide: 'TEACHER_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Teacher.name, TeacherSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
