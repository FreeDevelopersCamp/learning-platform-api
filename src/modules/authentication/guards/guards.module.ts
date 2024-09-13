import { Module } from '@nestjs/common';
import { TokenService } from '../service/token.service';
import { AuthGuard } from './auth/auth.guard';
import { PoliciesGuard } from './policies/policies.guard';
import { RolesGuard } from './roles/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig), SessionModule],
  providers: [AuthGuard, PoliciesGuard, RolesGuard, TokenService],
  exports: [AuthGuard, PoliciesGuard, RolesGuard, TokenService],
})
export class GuardsModule {}
