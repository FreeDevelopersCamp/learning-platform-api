import { Module } from '@nestjs/common';
import { InstructorController } from './instructor.controller';
import { InstructorService } from '../../services/instructor/instructor.service';
import { InstructorModels } from '../../entity/instructor/instructor.model.provider';
import { InstructorProfile } from '../../entity/instructor/instructor.mapper';

@Module({
  controllers: [InstructorController],
  providers: [
    InstructorService,
    InstructorModels.instructor,
    InstructorProfile,
  ],
})
export class InstructorModule {}
