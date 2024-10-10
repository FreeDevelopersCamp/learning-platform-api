import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from '../../services/manager/manager.service';
import { ManagerModels } from '../../entity/manager/manager.model.provider';
import { ManagerProfile } from '../../entity/manager/manager.mapper';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService, ManagerModels.manager, ManagerProfile],
  exports: [ManagerService],
})
export class ManagerModule {}
