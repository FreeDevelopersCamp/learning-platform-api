import { Connection } from "mongoose";
import { Course, CourseSchema } from "./course.schema";

export const CourseModels = {
    course: {
      provide: 'COURSE_MODEL',
      useFactory: async (tenantConnection: Connection) => {
        return tenantConnection.model(Course.name, CourseSchema);
      },
      inject: ['TENANT_CONNECTION'],
    },
  };
