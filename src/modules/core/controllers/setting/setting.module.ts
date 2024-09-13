import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from '../../services/setting/setting.service';
import { SettingModels } from '../../entity/setting/setting.model.provider';
import { SettingProfile } from '../../entity/setting/setting.mapper';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';

@Module({
  imports: [], // Remove PaginationService from imports
  controllers: [SettingController],
  providers: [
    SettingService,
    SettingModels.setting,
    SettingProfile,
    PaginationService,
  ],
  exports: [SettingService],
})
export class SettingModule {}
