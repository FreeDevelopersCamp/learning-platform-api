import { Injectable, BadRequestException } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { UserService } from '../../../core/services/user/user.service';

@Injectable()
export class ImageService {
  private readonly storage: Storage;
  private readonly bucketName = 'free-developers-camp-images'; // Replace with your actual bucket name

  constructor(private readonly _userService: UserService) {
    this.storage = new Storage({
      keyFilename: process.env.GCP_KEY_FILE,
    });
  }

  async uploadFile(file: Express.Multer.File, userId: string): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const fileName = `uploads/${file.originalname}`;
    const bucket = this.storage.bucket(this.bucketName);
    const fileObject = bucket.file(fileName);

    try {
      await fileObject.save(file.buffer); // Save file to Google Cloud Storage

      const user = await this._userService.getById(userId);
      user.image = `https://storage.googleapis.com/${this.bucketName}/${fileName}`;
      await this._userService.update(user);

      return `https://storage.googleapis.com/${this.bucketName}/${fileName}`;
    } catch (error) {
      console.error('Error uploading to GCP:', error);
      throw new BadRequestException(
        'Failed to upload file to Google Cloud Storage',
      );
    }
  }

  async generateSignedUrl(fileName: string): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const file = bucket.file(fileName);

    const options = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    try {
      // @ts-ignore
      const [url] = await file.getSignedUrl(options);
      return url;
    } catch (error) {
      throw new BadRequestException('Failed to generate signed URL');
    }
  }
}
