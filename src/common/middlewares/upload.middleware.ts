import { Injectable, NestMiddleware } from '@nestjs/common';
import * as multer from 'multer';

@Injectable()
export class UploadMiddleware implements NestMiddleware {
  private readonly upload = multer({
    storage: multer.memoryStorage(),
  }).single('file');

  use(req: any, res: any, next: () => void) {
    this.upload(req, res, (err) => {
      if (err) {
        return res.status(400).send(err.message);
      }
      next();
    });
  }
}
