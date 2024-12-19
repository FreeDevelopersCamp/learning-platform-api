import { Module } from '@nestjs/common';
import { ImageController } from './Image.controller';
import { ImageService } from '../../services/Image/Image.service';
import { ImageModels } from '../../entity/Image/Image.model.provider';
import { ImageProfile } from '../../entity/Image/Image.mapper';
import { UserModule } from '../../../core/controllers/user/user.module';
import { GuardsModule } from '../../../authentication/guards/guards.module';

@Module({
  imports: [UserModule, GuardsModule],
  controllers: [ImageController],
  providers: [ImageService, ImageModels.Image, ImageProfile],
})
export class ImageModule {}
