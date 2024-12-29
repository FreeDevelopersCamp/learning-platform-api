import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from '../service/authentication.service';
import { AuthController } from './authentication.controller';
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
import { ProfileModule } from '../../core/controllers/profile/profile.module';
import { ProgressModule } from 'src/modules/learn/controllers/progress/progress.module';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    GuardsModule,
    SessionModule,
    LookupModule,
    LearnerModule,
    InstructorModule,
    AdminModule,
    OwnerModule,
    ManagerModule,
    AccountManagerModule,
    ProgressModule,
    ContentManagerModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // Replace 'defaultSecret' with your actual secret key
      signOptions: { expiresIn: '1h' }, // Optional: Set token expiration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthenticationService, PasswordService, RoleFactory],
  exports: [AuthenticationService, PasswordService, JwtModule], // Export JwtModule so it can be used elsewhere
})
export class AuthenticationModule {}
