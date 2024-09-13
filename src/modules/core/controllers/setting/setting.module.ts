import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from '../../services/setting/setting.service';
import { SettingModels } from '../../entity/setting/setting.model.provider';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';
import { SettingProfile } from '../../entity/setting/setting.mapper';

@Module({
  // imports: [GuardsModule],
  controllers: [SettingController],
  providers: [
    SettingService,
    SettingModels.setting,
    SettingProfile,
    PaginationService,
  ],
  exports: [SettingService, SettingModels.setting, SettingProfile],
})
export class SettingModule {}
