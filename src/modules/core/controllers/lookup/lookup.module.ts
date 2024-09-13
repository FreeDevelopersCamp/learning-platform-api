import { Module } from '@nestjs/common';
import { LookupController } from './lookup.controller';
import { LookupService } from '../../services/lookup/lookup.service';
import { LookupProfile } from '../../entity/lookup/lookup.mapper';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { MongooseConnectionService } from 'src/Infra/database/Service/mongoose.connection.service';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';
import { lookupModels } from '../../entity/lookup/lookup.provider';

@Module({
  imports: [GuardsModule],
  controllers: [LookupController],
  providers: [
    LookupService,
    lookupModels.lookup,
    LookupProfile,
    MongooseConnectionService,
    PaginationService,
  ],
  exports: [LookupService, lookupModels.lookup, LookupProfile],
})
export class LookupModule {}
