import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from '../../services/setting/setting.service';
import { SettingModels } from '../../entity/setting/setting.model.provider';
import { SettingProfile } from '../../entity/setting/setting.mapper';

@Module({
  imports: [SettingModule],
  controllers: [SettingController],
  providers: [SettingService, SettingModels.setting, SettingProfile],
  exports: [SettingService],
})
export class SettingModule {}
