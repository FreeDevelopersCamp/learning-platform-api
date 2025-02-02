import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller';
import { RoadmapService } from '../../services/roadmap/roadmap.service';
import { RoadmapModels } from '../../entity/roadmap/roadmap.model.provider';
import { RoadmapProfile } from '../../entity/roadmap/roadmap.mapper';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { UserModule } from 'src/modules/core/controllers/user/user.module';
import { AdminModule } from 'src/modules/core/controllers/admin/admin.module';
import { OwnerModule } from 'src/modules/core/controllers/owner/owner.module';
import { ManagerModule } from 'src/modules/core/controllers/manager/manager.module';
import { AccountManagerModule } from 'src/modules/core/controllers/AccountManager/AccountManager.module';
import { ContentManagerModule } from 'src/modules/core/controllers/ContentManager/ContentManager.module';
import { InstructorModule } from 'src/modules/core/controllers/instructor/instructor.module';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';

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
  controllers: [RoadmapController],
  providers: [
    RoadmapService,
    RoadmapModels.roadmap,
    RoadmapProfile,
    PaginationService,
  ],
  exports: [RoadmapService, RoadmapProfile, RoadmapModels.roadmap],
})
export class RoadmapModule {}
