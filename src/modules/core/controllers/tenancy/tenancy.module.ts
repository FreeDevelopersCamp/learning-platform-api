import { Module } from '@nestjs/common';
import { TenancyController } from './tenancy.controller';
import { TenancyService } from '../../services/tenancy/tenancy.service';
import { TenancyModels } from '../../entity/tenancy/tenancy.model.provider';
import { TenancyProfile } from '../../entity/tenancy/tenancy.mapper';

@Module({
  controllers: [TenancyController],
  providers: [TenancyService, TenancyModels.tenancy, TenancyProfile],
})
export class TenancyModule {}
