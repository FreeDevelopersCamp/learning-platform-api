import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Param,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../../services/Image/Image.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('authorization')
@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload/:id') // Define a route parameter `:id`
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') userId: string, // Extract the `id` parameter from the route
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const imageUrl = await this.imageService.uploadFile(file, userId);

    return { imageUrl };
  }
}
