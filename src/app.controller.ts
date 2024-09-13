import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';

@Controller()
export class AppController {
  @ApiExcludeEndpoint()
  @Get()
  start(@Res() res: Response): void {
    const filePath = join(process.cwd(), 'src', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlContent) => {
      if (err) {
        res.status(500).send('Error reading file');
      } else {
        res.header('Content-Type', 'text/html');
        res.send(htmlContent);
      }
    });
  }
}
