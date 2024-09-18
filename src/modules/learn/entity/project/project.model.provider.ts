import { Connection } from 'mongoose';
import { Project, ProjectSchema } from './project.schema';

export const ProjectModels = {
  project: {
    provide: 'PROJECT_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Project.name, ProjectSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
