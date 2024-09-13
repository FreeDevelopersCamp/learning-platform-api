import { Global, Injectable, DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TenancyProfile } from '../../entity/tenancy/tenancy.mapper';
import { TenancyModels } from '../../entity/tenancy/tenancy.model.provider';
import { TenancyConnectionService } from '../../services/tenancy/tenancy.connection.service';
import { TenancyService } from '../../services/tenancy/tenancy.service';
import { TenancyController } from './tenancy.controller';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { LookupModule } from '../lookup/lookup.module';
import { UserModule } from '../user/user.module';
import { ISeedTenancyRepository } from 'src/infra/database/seeders/tenancy/tenancy.adapter';
import { SeedTenancyRepository } from 'src/Infra/database/seeders/tenancy/tenancy.repository';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';
import { AuthenticationModule } from 'src/modules/authentication/controllers/authentication.module';

@Global()
@Injectable()
export class TenancyModule {
  static forRoot(): DynamicModule {
    return {
      module: TenancyModule,
      imports: [
        LookupModule,
        AuthenticationModule,
        LookupModule,
        UserModule,
        GuardsModule,
        MongooseModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('database.url'),
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [
        TenancyConnectionService,
        TenancyService,
        TenancyModels.tenancy,
        PaginationService,
        TenancyProfile,
        {
          provide: ISeedTenancyRepository,
          useClass: SeedTenancyRepository,
        },
      ],
      controllers: [TenancyController],
      exports: [TenancyConnectionService],
    };
  }
}
