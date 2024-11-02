import { Module } from '@nestjs/common';
import { InstructorController } from './instructor.controller';
import { InstructorService } from '../../services/instructor/instructor.service';
import { InstructorModels } from '../../entity/instructor/instructor.model.provider';
import { InstructorProfile } from '../../entity/instructor/instructor.mapper';
import { UserModule } from '../user/user.module';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { AdminModule } from '../admin/admin.module';
import { OwnerModule } from '../owner/owner.module';
import { ManagerModule } from '../manager/manager.module';
import { AccountManagerModule } from '../AccountManager/AccountManager.module';
import { ContentManagerModule } from '../ContentManager/ContentManager.module';

@Module({
  imports: [
    UserModule,
    GuardsModule,
    AdminModule,
    OwnerModule,
    ManagerModule,
    AccountManagerModule,
    ContentManagerModule,
  ],
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
