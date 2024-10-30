import { Module } from '@nestjs/common';
import { LearnerController } from './learner.controller';
import { LearnerService } from '../../services/learner/learner.service';
import { LearnerModels } from '../../entity/learner/learner.model.provider';
import { LearnerProfile } from '../../entity/learner/learner.mapper';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { UserModule } from '../user/user.module';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';
import { AdminModule } from '../admin/admin.module';
import { OwnerModule } from '../owner/owner.module';
import { ManagerModule } from '../manager/manager.module';
import { AccountManagerModule } from '../AccountManager/AccountManager.module';
import { InstructorModule } from '../instructor/instructor.module';
import { ContentManagerModule } from '../ContentManager/ContentManager.module';

@Module({
  imports: [
    GuardsModule,
    UserModule,
    AdminModule,
    OwnerModule,
    ManagerModule,
    AccountManagerModule,
    ContentManagerModule,
    InstructorModule,
  ],
  controllers: [LearnerController],
  providers: [
    LearnerService,
    LearnerModels.learner,
    LearnerProfile,
    PaginationService,
  ],
  exports: [LearnerService],
})
export class LearnerModule {}
