import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from '../../services/course/course.service';
import { CourseModels } from '../../entity/course/course.model.provider';
import { CourseProfile } from '../../entity/course/course.mapper';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';

@Module({
  imports: [GuardsModule],
  controllers: [CourseController],
  providers: [
    CourseService,
    CourseModels.course,
    CourseProfile,
    PaginationService,
  ],
  exports: [CourseService, CourseModels.course],
})
export class CourseModule {}
