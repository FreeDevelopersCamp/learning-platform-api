import { Connection } from 'mongoose';
import { Exam, ExamSchema } from './exam.schema';

export const ExamModels = {
  exam: {
    provide: 'EXAM_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Exam.name, ExamSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
