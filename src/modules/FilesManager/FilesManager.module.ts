import { Module } from '@nestjs/common';
import { ImageModule } from './controllers/Image/Image.module';

@Module({
  imports: [ImageModule],
})
export class FilesManagerModule {}
