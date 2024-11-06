import { Module } from '@nestjs/common';
import { PracticeController } from './practice.controller';
import { PracticeService } from '../../services/practice/practice.service';
import { PracticeModels } from '../../entity/practice/practice.model.provider';
import { PracticeProfile } from '../../entity/practice/practice.mapper';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';
import { UserModule } from 'src/modules/core/controllers/user/user.module';
import { AdminModule } from 'src/modules/core/controllers/admin/admin.module';
import { ContentManagerModule } from 'src/modules/core/controllers/ContentManager/ContentManager.module';
import { InstructorModule } from 'src/modules/core/controllers/instructor/instructor.module';
import { OwnerModule } from 'src/modules/core/controllers/owner/owner.module';
import { ManagerModule } from 'src/modules/core/controllers/manager/manager.module';
import { AccountManagerModule } from 'src/modules/core/controllers/AccountManager/AccountManager.module';

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
  controllers: [PracticeController],
  providers: [
    PracticeService,
    PracticeModels.practice,
    PracticeProfile,
    PaginationService,
  ],
  exports: [PracticeService],
})
export class PracticeModule {}
