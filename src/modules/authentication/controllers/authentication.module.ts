import { AuthenticationService } from '../service/authentication.service';
import { AuthController } from './authentication.controller';
import { Module } from '@nestjs/common';
import { PasswordService } from '../service/password.service';
import { GuardsModule } from '../guards/guards.module';
import { UserModule } from 'src/modules/core/controllers/user/user.module';
import { SessionModule } from '../session/session.module';
import { LookupModule } from 'src/modules/core/controllers/lookup/lookup.module';
import { LearnerModule } from 'src/modules/core/controllers/learner/learner.module';
import { InstructorModule } from 'src/modules/core/controllers/instructor/instructor.module';
import { OwnerModule } from 'src/modules/core/controllers/owner/owner.module';
import { AccountManagerModule } from 'src/modules/core/controllers/AccountManager/AccountManager.module';
import { ContentManagerModule } from 'src/modules/core/controllers/ContentManager/ContentManager.module';
import { RoleFactory } from '../guards/roles/roleFactory';
import { ManagerModule } from 'src/modules/core/controllers/manager/manager.module';
import { AdminModule } from 'src/modules/core/controllers/admin/admin.module';

@Module({
  imports: [
    UserModule,
    GuardsModule,
    SessionModule,
    LookupModule,
    LearnerModule,
    InstructorModule,
    AdminModule,
    OwnerModule,
    ManagerModule,
    AccountManagerModule,
    ContentManagerModule,
  ],
  controllers: [AuthController],
  providers: [AuthenticationService, PasswordService, RoleFactory],
  exports: [AuthenticationService, PasswordService],
})
export class AuthenticationModule {}
