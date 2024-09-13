import { MenuModule } from './controllers/menu/menu.module';
import { LookupModule } from './controllers/lookup/lookup.module';
import { SettingModule } from './controllers/setting/setting.module';
import { TenancyModule } from './controllers/tenancy/tenancy.module';
import { Module } from '@nestjs/common';
import { UserModule } from './controllers/user/user.module';

@Module({
  imports: [
    MenuModule,
    LookupModule,
    SettingModule,
    TenancyModule.forRoot(),
    UserModule,
  ],
})
export class CoreModule {}
