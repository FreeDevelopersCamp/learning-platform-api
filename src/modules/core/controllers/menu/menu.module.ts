import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from '../../services/menu/menu.service';
import { MenuModels } from '../../entity/menu/menu.model.provider';
import { GuardsModule } from 'src/modules/authentication/guards/guards.module';
import { MenuProfile } from '../../entity/menu/menu.mapper';
import { UserModels } from '../../entity/user/user.model.provider';
import { UserModule } from '../user/user.module';
import { PaginationService } from 'src/common/interceptors/pagination/pagination.service';

@Module({
  imports: [GuardsModule, UserModule],
  controllers: [MenuController],
  providers: [
    MenuService,
    MenuModels.menu,
    MenuProfile,
    UserModels.user,
    PaginationService,
  ],
})
export class MenuModule {}
