import { Module } from '@nestjs/common';
import { InstructorController } from './instructor.controller';
import { InstructorService } from '../../services/instructor/instructor.service';
import { InstructorModels } from '../../entity/instructor/instructor.model.provider';
import { InstructorProfile } from '../../entity/instructor/instructor.mapper';
import { UserModule } from '../user/user.module';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';
import { CourseModule } from 'src/modules/learn/controllers/course/course.module';
import { RoadmapModule } from 'src/modules/learn/controllers/roadmap/roadmap.module';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';

@Module({
  imports: [UserModule, CourseModule, RoadmapModule, GuardsModule],
  controllers: [InstructorController],
  providers: [
    InstructorService,
    InstructorModels.instructor,
    InstructorProfile,
    PaginationService,
  ],
  exports: [InstructorService, InstructorProfile, InstructorModels.instructor],
})
export class InstructorModule {}
