import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from '../../services/course/course.service';
import { CourseModels } from '../../entity/course/course.model.provider';
import { CourseProfile } from '../../entity/course/course.mapper';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';
import { InstructorModule } from 'src/modules/core/controllers/instructor/instructor.module';
import { AdminModule } from 'src/modules/core/controllers/admin/admin.module';
import { ContentManagerModule } from 'src/modules/core/controllers/ContentManager/ContentManager.module';
import { UserModule } from 'src/modules/core/controllers/user/user.module';

@Module({
  imports: [
    GuardsModule,
    UserModule,
    AdminModule,
    ContentManagerModule,
    InstructorModule,
  ],
  controllers: [CourseController],
  providers: [
    CourseService,
    CourseModels.course,
    CourseProfile,
    PaginationService,
  ],
  exports: [CourseService, CourseProfile, CourseModels.course],
})
export class CourseModule {}
