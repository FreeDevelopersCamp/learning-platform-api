import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { AppModule } from 'src/app.module';
import { AuthenticationModule } from 'src/modules/authentication/controllers/authentication.module';
import { CoreModule } from 'src/modules/core/core.module';

const bearerOptions: SecuritySchemeObject = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  description: 'Enter Your Token',
  name: 'JWT',
  in: 'header',
};

const swaggerConfig = new DocumentBuilder()
  .setTitle('FreeDevelopersCamp API Management')
  .setVersion('1.0')
  .addBearerAuth(bearerOptions, 'authorization')
  .addGlobalParameters({
    name: 'x-tenant-id',
    in: 'header',
  })
  .build();

export const swaggerConfiguration = (app: INestApplication<any>) => {
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [AppModule],
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api/v1/app', app, document);

  const authenticationDocument = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    {
      include: [AuthenticationModule],
      deepScanRoutes: true,
    },
  );

  SwaggerModule.setup('api/v1/app/auth', app, authenticationDocument);

  const coreDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [CoreModule],
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api/v1/app/core', app, coreDocument);
};
