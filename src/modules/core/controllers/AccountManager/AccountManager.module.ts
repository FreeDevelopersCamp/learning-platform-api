import { Module } from '@nestjs/common';
import { AccountManagerController } from './AccountManager.controller';
import { AccountManagerService } from '../../services/AccountManager/AccountManager.service';
import { AccountManagerModels } from '../../entity/AccountManager/AccountManager.model.provider';
import { AccountManagerProfile } from '../../entity/AccountManager/AccountManager.mapper';

@Module({
  controllers: [AccountManagerController],
  providers: [
    AccountManagerService,
    AccountManagerModels.AccountManager,
    AccountManagerProfile,
  ],
  exports: [AccountManagerService],
})
export class AccountManagerModule {}
