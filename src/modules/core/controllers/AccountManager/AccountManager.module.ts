import { Module } from '@nestjs/common';
import { AccountManagerController } from './AccountManager.controller';
import { AccountManagerService } from '../../services/AccountManager/AccountManager.service';
import { AccountManagerModels } from '../../entity/AccountManager/AccountManager.model.provider';
import { AccountManagerProfile } from '../../entity/AccountManager/AccountManager.mapper';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, GuardsModule],
  controllers: [AccountManagerController],
  providers: [
    AccountManagerService,
    AccountManagerModels.AccountManager,
    AccountManagerProfile,
  ],
  exports: [AccountManagerService],
})
export class AccountManagerModule {}
