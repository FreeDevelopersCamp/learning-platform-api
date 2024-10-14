import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from '../../services/admin/admin.service';
import { AdminModels } from '../../entity/admin/admin.model.provider';
import { AdminProfile } from '../../entity/admin/admin.mapper';
import { UserModule } from '../user/user.module';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';

@Module({
  imports: [UserModule, GuardsModule],
  controllers: [AdminController],
  providers: [AdminService, AdminModels.admin, AdminProfile, PaginationService],
  exports: [AdminService],
})
export class AdminModule {}
