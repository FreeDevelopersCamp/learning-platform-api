import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from '../../services/exam/exam.service';
import { ExamModels } from '../../entity/exam/exam.model.provider';
import { ExamProfile } from '../../entity/exam/exam.mapper';

@Module({
  controllers: [ExamController],
  providers: [ExamService, ExamModels.exam, ExamProfile],
  exports: [ExamService, ExamModels.exam, ExamProfile],
})
export class ExamModule {}
