import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from '../../services/project/project.service';
import { ProjectModels } from '../../entity/project/project.model.provider';
import { ProjectProfile } from '../../entity/project/project.mapper';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { UserModule } from 'src/modules/core/controllers/user/user.module';
import { AdminModule } from 'src/modules/core/controllers/admin/admin.module';
import { ContentManagerModule } from 'src/modules/core/controllers/ContentManager/ContentManager.module';
import { InstructorModule } from 'src/modules/core/controllers/instructor/instructor.module';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';
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
  controllers: [ProjectController],
  providers: [
    ProjectService,
    ProjectModels.project,
    ProjectProfile,
    PaginationService,
  ],
  exports: [ProjectService, ProjectModule, ProjectModels.project],
})
export class ProjectModule {}
