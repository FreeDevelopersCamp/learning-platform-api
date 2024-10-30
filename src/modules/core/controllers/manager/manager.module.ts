import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from '../../services/manager/manager.service';
import { ManagerModels } from '../../entity/manager/manager.model.provider';
import { ManagerProfile } from '../../entity/manager/manager.mapper';
import { UserModule } from '../user/user.module';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';
import { AdminModule } from '../admin/admin.module';
import { OwnerModule } from '../owner/owner.module';

@Module({
  imports: [UserModule, GuardsModule, AdminModule, OwnerModule],
  controllers: [ManagerController],
  providers: [
    ManagerService,
    ManagerModels.manager,
    ManagerProfile,
    PaginationService,
  ],
  exports: [ManagerService],
})
export class ManagerModule {}
