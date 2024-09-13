import { SettingModule } from 'src/modules/core/controllers/setting/setting.module';
import { SessionModels } from './session';
import { SessionService } from './sessions.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [SettingModule],
  providers: [SessionModels.session, SessionService],
  exports: [SessionModels.session, SessionService],
})
export class SessionModule {}
