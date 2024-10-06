import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from '../../services/teacher/teacher.service';
import { TeacherModels } from '../../entity/teacher/teacher.model.provider';
import { TeacherProfile } from '../../entity/teacher/teacher.mapper';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService, TeacherModels.teacher, TeacherProfile],
})
export class TeacherModule {}
