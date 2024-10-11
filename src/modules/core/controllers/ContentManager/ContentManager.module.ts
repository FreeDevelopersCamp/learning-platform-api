import { Module } from '@nestjs/common';
import { ContentManagerController } from './ContentManager.controller';
import { ContentManagerService } from '../../services/ContentManager/ContentManager.service';
import { ContentManagerModels } from '../../entity/ContentManager/ContentManager.model.provider';
import { ContentManagerProfile } from '../../entity/ContentManager/ContentManager.mapper';
import { UserModule } from '../user/user.module';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';

@Module({
  imports: [UserModule, GuardsModule],
  controllers: [ContentManagerController],
  providers: [
    ContentManagerService,
    ContentManagerModels.ContentManager,
    ContentManagerProfile,
  ],
  exports: [ContentManagerService],
})
export class ContentManagerModule {}
