import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from '../../services/owner/owner.service';
import { OwnerModels } from '../../entity/owner/owner.model.provider';
import { OwnerProfile } from '../../entity/owner/owner.mapper';
import { UserModule } from '../user/user.module';
import { ManagerModule } from '../manager/manager.module';

@Module({
  imports: [UserModule, ManagerModule],
  controllers: [OwnerController],
  providers: [OwnerService, OwnerModels.owner, OwnerProfile],
  exports: [OwnerService],
})
export class OwnerModule {}
