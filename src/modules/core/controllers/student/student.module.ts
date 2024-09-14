import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from '../../services/student/student.service';
import { StudentModels } from '../../entity/student/student.model.provider';
import { StudentProfile } from '../../entity/student/student.mapper';

@Module({
  controllers: [
    StudentController
  ],
  providers: [
    StudentService,
    StudentModels.student,
    StudentProfile
  ]
})
export class StudentModule {}
