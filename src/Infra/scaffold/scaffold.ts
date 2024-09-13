import { mkdir, writeFile, readFile } from 'fs';
import { promisify } from 'util';
import * as path from 'path';
import { access, constants } from 'fs/promises';

const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);
const mkdirAsync = promisify(mkdir);

const generateModule = async (modelName: string, moduleName: string) => {
  try {
    const modulePath = path.join(`./src/modules/${moduleName}`);
    const controllersPath = path.join(modulePath, `controllers/${modelName}`);
    const dtoPath = path.join(modulePath, `dto/${modelName}`);
    const entitiesPath = path.join(modulePath, `entity/${modelName}`);
    const servicesPath = path.join(modulePath, `services/${modelName}`);
    const sharedPath = path.join(modulePath);

    await mkdirAsync(controllersPath, { recursive: true });
    await mkdirAsync(dtoPath, { recursive: true });
    await mkdirAsync(entitiesPath, { recursive: true });
    await mkdirAsync(servicesPath, { recursive: true });
    await mkdirAsync(sharedPath, { recursive: true });

    await writeFileAsync(
      path.join(controllersPath, `${modelName}.controller.ts`),
      generateControllerContent(modelName),
    );
    await writeFileAsync(
      path.join(controllersPath, `${modelName}.module.ts`),
      generateModuleContent(modelName),
    );

    await writeFileAsync(
      path.join(dtoPath, `create.${modelName}.ts`),
      generateCreateDtoContent(modelName),
    );
    await writeFileAsync(
      path.join(dtoPath, `update.${modelName}.ts`),
      generateUpdateDtoContent(modelName),
    );
    await writeFileAsync(
      path.join(dtoPath, `resource.${modelName}.ts`),
      generateResourceDtoContent(modelName),
    );
    await writeFileAsync(
      path.join(dtoPath, `${modelName}.ts`),
      generateDtoContent(modelName),
    );

    await writeFileAsync(
      path.join(entitiesPath, `${modelName}.mapper.ts`),
      generateMapperContent(modelName),
    );
    await writeFileAsync(
      path.join(entitiesPath, `${modelName}.model.provider.ts`),
      generateProviderContent(modelName),
    );
    await writeFileAsync(
      path.join(entitiesPath, `${modelName}.schema.ts`),
      generateSchemaContent(modelName),
    );

    await writeFileAsync(
      path.join(servicesPath, `${modelName}.service.ts`),
      generateServiceContent(modelName),
    );

    checkFileExists(path.join(sharedPath, `${moduleName}.module.ts`)).then(
      (exists) => {
        if (exists) {
          addModuleToSharedModule(
            path.join(sharedPath, `${moduleName}.module.ts`),
          );
        } else {
          writeFileAsync(
            path.join(sharedPath, `${moduleName}.module.ts`),
            generateSharedModuleContent(modelName),
          );
        }
      },
    );

    await addModuleToAppModule();

    console.log(
      `Module ${modelName} with all components created successfully at ${modulePath}.`,
    );
  } catch (error) {
    console.error(`Error creating module ${modelName}:`, error);
  }
};

const generateControllerContent = (modelName: string) => `import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
  } from '@nestjs/common';
  import { ${capitalize(modelName)}Service } from '../../services/${modelName}/${modelName}.service';
  import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
  import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
  import { SchemaValidation } from 'src/common/pipes/schema-validation.pipe';
  import { Create${capitalize(modelName)}Dto } from '../../dto/${modelName}/create.${modelName}';
  import { Update${capitalize(modelName)}Dto } from '../../dto/${modelName}/update.${modelName}';
  import { Resource${capitalize(modelName)}Dto } from '../../dto/${modelName}/resource.${modelName}';
  
  @ApiBearerAuth('authorization')
  @ApiTags('${modelName}')
  @Controller('${modelName}')
  export class ${capitalize(modelName)}Controller {
    constructor(private readonly _${modelName}Service: ${capitalize(modelName)}Service) {}
  
    @Get()
    @ApiResponse({
    description: 'List of ${modelName}',
    isArray: true,
    type: Resource${capitalize(modelName)}Dto,
    })
    list() {
      return this._${modelName}Service.list();
    }
  
    @Get('/:id')
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: '${modelName} information',
    isArray: false,
    type: Resource${capitalize(modelName)}Dto,
    })
    getById(@Param('id') id: string) {
      return this._${modelName}Service.getById(id);
    }
  
    @Post()
    @UsePipes(new SchemaValidation())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: '${modelName} created information',
    isArray: false,
    type: Resource${capitalize(modelName)}Dto,
    })
    create(@Body() ${modelName}: Create${capitalize(modelName)}Dto) {
      return this._${modelName}Service.create(${modelName});
    }
  
    @Patch()
    @UsePipes(new ObjectIdValidationPipe(), new SchemaValidation())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: '${modelName} updated information',
    isArray: false,
    type: Resource${capitalize(modelName)}Dto,
    })
    update(@Body() ${modelName}: Update${capitalize(modelName)}Dto) {
      return this._${modelName}Service.update(${modelName});
    }
  
    @Delete('/:id')
    @UsePipes(new ObjectIdValidationPipe())
    @UsePipes(new ObjectIdValidationPipe())
    @ApiResponse({
    description: 'Deleted result',
    isArray: false,
    type: Resource${capitalize(modelName)}Dto,
    })
    delete(@Param('id') id: string) {
      return this._${modelName}Service.delete(id);
    }
  }  
`;

const generateModuleContent = (
  modelName: string,
) => `import { Module } from '@nestjs/common';
import { ${capitalize(modelName)}Controller } from './${modelName}.controller';
import { ${capitalize(modelName)}Service } from '../../services/${modelName}/${modelName}.service';
import { ${capitalize(modelName)}Models } from '../../entity/${modelName}/${modelName}.model.provider';
import { ${capitalize(modelName)}Profile } from '../../entity/${modelName}/${modelName}.mapper';

@Module({
  controllers: [
    ${capitalize(modelName)}Controller
  ],
  providers: [
    ${capitalize(modelName)}Service,
    ${capitalize(modelName)}Models.${modelName},
    ${capitalize(modelName)}Profile
  ]
})
export class ${capitalize(modelName)}Module {}
`;

const generateCreateDtoContent = (
  modelName: string,
) => `import { ${capitalize(modelName)}Dto } from "./${modelName}";

export class Create${capitalize(modelName)}Dto extends ${capitalize(modelName)}Dto {}
`;

const generateUpdateDtoContent = (
  modelName: string,
) => `import { ${capitalize(modelName)}Dto } from "./${modelName}";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class Update${capitalize(modelName)}Dto extends ${capitalize(modelName)}Dto {
    @ApiProperty({ default: '' })
    @AutoMap()
    _id: string;
}
`;

const generateResourceDtoContent = (
  modelName: string,
) => `import { ${capitalize(modelName)}Dto } from "./${modelName}";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class Resource${capitalize(modelName)}Dto extends ${capitalize(modelName)}Dto {
    @ApiProperty({ default: '' })
    @AutoMap()
    _id: string;
}
`;

const generateDtoContent = (modelName: string) =>
  `export class ${capitalize(modelName)}Dto {}`;

const generateMapperContent = (
  modelName: string,
) => `import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { ${capitalize(modelName)} } from './${capitalize(modelName)}.schema';
import { ${capitalize(modelName)}Dto } from '../../dto/${modelName}/${modelName}';
import { Resource${capitalize(modelName)}Dto } from '../../dto/${modelName}/resource.${modelName}';
import { Create${capitalize(modelName)}Dto } from '../../dto/${modelName}/create.${modelName}';
import { Update${capitalize(modelName)}Dto } from '../../dto/${modelName}/update.${modelName}';
import { Types } from 'mongoose';

export class ${capitalize(modelName)}Profile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
      }
    
      override get profile() {
        return (mapper) => {
          createMap(mapper, ${capitalize(modelName)}Dto, ${capitalize(modelName)});
          createMap(mapper, ${capitalize(modelName)}, ${capitalize(modelName)}Dto);

          createMap(
            mapper,
            Resource${capitalize(modelName)}Dto,
            ${capitalize(modelName)},
            forMember(
              (dest) => dest._id,
              mapFrom((src) => new Types.ObjectId(src._id)),
            ),
          );
          createMap(
            mapper,
            ${capitalize(modelName)},
            Resource${capitalize(modelName)}Dto,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => src._id.toString()),
            ),
          );

          createMap(mapper, Resource${capitalize(modelName)}Dto, ${capitalize(modelName)}Dto);
          createMap(mapper, ${capitalize(modelName)}Dto, Resource${capitalize(modelName)}Dto);
    
          createMap(mapper, Resource${capitalize(modelName)}Dto, Create${capitalize(modelName)}Dto);
          createMap(mapper, Create${capitalize(modelName)}Dto, Resource${capitalize(modelName)}Dto);
    
          createMap(mapper, Resource${capitalize(modelName)}Dto, Update${capitalize(modelName)}Dto);
          createMap(mapper, Update${capitalize(modelName)}Dto, Resource${capitalize(modelName)}Dto);
        };
      }
}
`;

const generateProviderContent = (
  modelName: string,
) => `import { Connection } from "mongoose";
import { ${capitalize(modelName)}, ${capitalize(modelName)}Schema } from "./${modelName}.schema";

export const ${capitalize(modelName)}Models = {
    ${modelName}: {
      provide: '${capitalizeAllLetters(modelName)}_MODEL',
      useFactory: async (tenantConnection: Connection) => {
        return tenantConnection.model(${capitalize(modelName)}.name, ${capitalize(modelName)}Schema);
      },
      inject: ['TENANT_CONNECTION'],
    },
  };
`;

const generateSchemaContent = (
  modelName: string,
) => `import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class ${capitalize(modelName)} extends BaseEntity {}

export const ${capitalize(modelName)}Schema = SchemaFactory.createForClass(${capitalize(modelName)});
`;

const generateServiceContent = (
  modelName: string,
) => `import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ${capitalize(modelName)} } from '../../entity/${modelName}/${modelName}.schema';
import { Resource${capitalize(modelName)}Dto } from '../../dto/${modelName}/resource.${modelName}';
import { Create${capitalize(modelName)}Dto } from '../../dto/${modelName}/create.${modelName}';
import { Update${capitalize(modelName)}Dto } from '../../dto/${modelName}/update.${modelName}';

@Injectable()
export class ${capitalize(modelName)}Service {
  private readonly _repo: IMongoRepository<${capitalize(modelName)}>;

  constructor(
    @Inject('${capitalizeAllLetters(modelName)}_MODEL') private _${modelName}Model: Model<${capitalize(modelName)}>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<${capitalize(modelName)}>(_${modelName}Model);
  }

  async list(): Promise<Resource${capitalize(modelName)}Dto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      ${capitalize(modelName)},
      Resource${capitalize(modelName)}Dto,
    );
  }

  async getById(id: string): Promise<Resource${capitalize(modelName)}Dto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      ${capitalize(modelName)},
      Resource${capitalize(modelName)}Dto,
    );
  }

  async create(dto: Create${capitalize(modelName)}Dto): Promise<Resource${capitalize(modelName)}Dto> {
    return this._mapper.map(
      await this._repo.create(new this._${modelName}Model(dto)),
      ${capitalize(modelName)},
      Resource${capitalize(modelName)}Dto,
    );
  }

  async update(dto: Update${capitalize(modelName)}Dto): Promise<Resource${capitalize(modelName)}Dto> {
    return this._mapper.map(
      await this._repo.update(new this._${modelName}Model(dto)),
      ${capitalize(modelName)},
      Resource${capitalize(modelName)}Dto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}

`;

const generateSharedModuleContent = (
  modelName: string,
) => `import { Module } from '@nestjs/common';
import { ${capitalize(modelName)}Module } from './controllers/${modelName}/${modelName}.module';

@Module({
    imports: [
        ${capitalize(modelName)}Module,
    ],
})
export class ${capitalize(moduleName)}Module {}
`;

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const capitalizeAllLetters = (s: string) => s.toUpperCase();
const [, , modelName, moduleName] = process.argv;

if (!modelName || !moduleName) {
  console.error('Usage: ts-node scaffold.ts <module-name> <base-path>');
  process.exit(1);
}

const addModuleToAppModule = async () => {
  try {
    const modulePath = path.join(`./src/app.module.ts`);
    const resolvedAppModulePath = path.resolve(modulePath);
    const appModuleContent = await readFileAsync(
      resolvedAppModulePath,
      'utf-8',
    );
    const sharedModuleExists = appModuleContent.includes(
      `${capitalize(moduleName)}Module`,
    );

    if (sharedModuleExists) {
      return;
    }

    const importStatement = `import { ${capitalize(moduleName)}Module } from './modules/${moduleName}/${moduleName}.module';\n`;

    if (appModuleContent.includes(importStatement)) {
      return;
    }

    const updatedAppModuleContent = appModuleContent.replace(
      'imports: [',
      `imports: [
    ${capitalize(moduleName)}Module,`,
    );
    const updatedContentWithImport = importStatement + updatedAppModuleContent;

    await writeFileAsync(resolvedAppModulePath, updatedContentWithImport, {
      encoding: 'utf-8',
    });

    console.log(
      `Module ${capitalize(moduleName)}Module added to app.module.ts.`,
    );
  } catch (error) {
    console.error(
      `Error adding ${capitalize(moduleName)}Module to app.module.ts:`,
      error,
    );
  }
};

const checkFileExists = async (filePath: string): Promise<boolean> => {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

const addModuleToSharedModule = async (modulePath: string) => {
  try {
    const resolvedAppModulePath = path.resolve(modulePath);
    const sharedModuleContent = await readFileAsync(
      resolvedAppModulePath,
      'utf-8',
    );
    console.log('adding');
    const moduleExists = sharedModuleContent.includes(
      `${capitalize(modelName)}Module`,
    );

    if (moduleExists) {
      return;
    }

    const importStatement = `import { ${capitalize(modelName)}Module } from './controllers/${modelName}/${modelName}.module';\n`;

    if (sharedModuleContent.includes(importStatement)) {
      return;
    }

    const updatedSharedModuleContent = sharedModuleContent.replace(
      'imports: [',
      `imports: [
    ${capitalize(modelName)}Module,`,
    );
    const updatedContentWithImport =
      importStatement + updatedSharedModuleContent;

    await writeFileAsync(resolvedAppModulePath, updatedContentWithImport, {
      encoding: 'utf-8',
    });

    console.log(
      `Module ${capitalize(modelName)}Module added to ${moduleName}.module.ts.`,
    );
  } catch (error) {
    console.error(
      `Error adding ${capitalize(modelName)}Module to ${moduleName}.module.ts:`,
      error,
    );
  }
};

generateModule(modelName, moduleName);
