import { LearnModule } from './modules/learn/learn.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { ConfigModule } from '@nestjs/config';
import configurations from './config/configurations';
import { CoreModule } from './modules/core/core.module';
import { IMongoRepository } from './infra/database/repository/adapter';
import { MongoRepository } from './Infra/database/repository/mongo-repository';
import { ObjectIdValidationPipe } from './common/pipes/object-id-validation.pipe';
import { TenantsMiddleware } from './common/middlewares/tenants.middleware';
import { classes } from '@automapper/classes';
import { AuthenticationModule } from './modules/authentication/controllers/authentication.module';
import { AppController } from './app.controller';
import { SchemaValidation } from './common/pipes/schema-validation.pipe';

@Module({
  imports: [
    LearnModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configurations],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    CoreModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: IMongoRepository,
      useClass: MongoRepository,
    },
    ObjectIdValidationPipe,
    SchemaValidation,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantsMiddleware).forRoutes('*');
  }
}
