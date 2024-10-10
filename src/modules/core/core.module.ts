import { OwnerModule } from './controllers/owner/owner.module';
import { ContentManagerModule } from './controllers/ContentManager/ContentManager.module';
import { AccountManagerModule } from './controllers/AccountManager/AccountManager.module';
import { ManagerModule } from './controllers/manager/manager.module';
import { LearnerModule } from './controllers/learner/learner.module';
import { InstructorModule } from './controllers/instructor/instructor.module';
import { ProfileModule } from './controllers/profile/profile.module';
import { MenuModule } from './controllers/menu/menu.module';
import { LookupModule } from './controllers/lookup/lookup.module';
import { SettingModule } from './controllers/setting/setting.module';
import { TenancyModule } from './controllers/tenancy/tenancy.module';
import { Module } from '@nestjs/common';
import { UserModule } from './controllers/user/user.module';

@Module({
  imports: [
    OwnerModule,
    ContentManagerModule,
    AccountManagerModule,
    ManagerModule,
    LearnerModule,
    InstructorModule,
    ProfileModule,
    MenuModule,
    LookupModule,
    SettingModule,
    TenancyModule.forRoot(),
    UserModule,
  ],
})
export class CoreModule {}
