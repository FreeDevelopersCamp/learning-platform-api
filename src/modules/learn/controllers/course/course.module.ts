import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from '../../services/course/course.service';
import { CourseModels } from '../../entity/course/course.model.provider';
import { CourseProfile } from '../../entity/course/course.mapper';

@Module({
  controllers: [CourseController],
  providers: [CourseService, CourseModels.course, CourseProfile],
  exports: [CourseService, CourseModels.course],
})
export class CourseModule {}
