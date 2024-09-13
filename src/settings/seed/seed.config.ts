import { INestApplication } from '@nestjs/common';
import { ISeedTenancyRepository } from 'src/infra/database/seeders/tenancy/tenancy.adapter';
import { ISeedUserRepository } from 'src/infra/database/seeders/user/user.adapter';
import { SettingService } from 'src/modules/core/services/setting/setting.service';

export const seedConfiguration = async (app: INestApplication<any>) => {
  const tenancyRepository = app.resolve(ISeedTenancyRepository);
  (await tenancyRepository).seed();

  const userRepository = app.resolve(ISeedUserRepository);
  (await userRepository).seed();

  const settingRepository = app.resolve(SettingService);
  (await settingRepository).seed();
};
