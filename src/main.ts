import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './common/filters/app-exception.filter';
import { corsConfiguration } from './settings/cors/cors.config';
import { seedConfiguration } from './settings/seed/seed.config';
import { swaggerConfiguration } from './settings/swagger/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';

const port = parseInt(process.env.PORT, 10) || 4000;
const globalPrefix = process.env.GLOBAL_PREFIX;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.useStaticAssets(join(__dirname, '..', 'uploads'), {
  //   prefix: '/uploads/',
  // });

  app.useGlobalFilters(new AppExceptionFilter());
  app.setGlobalPrefix(globalPrefix);

  corsConfiguration(app);
  swaggerConfiguration(app);
  seedConfiguration(app);

  await app.listen(port, () => {
    console.log(
      `🚀 Application running at ${process.env.HOST}/${globalPrefix}`,
    );
  });
}

bootstrap();
