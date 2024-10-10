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

@Module({
  imports: [
    UserModule,
    GuardsModule,
    SessionModule,
    LookupModule,
    LearnerModule,
    InstructorModule,
  ],
  controllers: [AuthController],
  providers: [AuthenticationService, PasswordService],
  exports: [AuthenticationService, PasswordService],
})
export class AuthenticationModule {}
