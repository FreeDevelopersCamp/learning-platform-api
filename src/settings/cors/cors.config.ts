import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const corsConfiguration = (app: INestApplication<any>) => {
  const configService = app.get(ConfigService);
  const whitelist = configService.get<string[]>('cors.whitelist');

  // If no whitelist is provided or you want to allow all origins
  if (!whitelist || whitelist.length === 0) {
    app.enableCors({
      origin: true, // Allow all origins
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
    return;
  }

  // Apply whitelist-based CORS configuration
  app.enableCors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is in the whitelist
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
};
