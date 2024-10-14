import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from '../../services/owner/owner.service';
import { OwnerModels } from '../../entity/owner/owner.model.provider';
import { OwnerProfile } from '../../entity/owner/owner.mapper';
import { UserModule } from '../user/user.module';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';

@Module({
  imports: [UserModule, GuardsModule],
  controllers: [OwnerController],
  providers: [OwnerService, OwnerModels.owner, OwnerProfile, PaginationService],
  exports: [OwnerService],
})
export class OwnerModule {}
