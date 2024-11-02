import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Lookup, LookupSchema } from '../../entity/lookup/lookup.schema';
import { ResourceLookupDto } from '../../dto/lookup/resource.lookup';
import { UpdateLookupDto } from '../../dto/lookup/update.lookup';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { CreateLookupDto } from '../../dto/lookup/create.lookup';
import { MongooseConnectionService } from 'src/Infra/database/Service/mongoose.connection.service';
import { cities } from 'src/Infra/database/seeders/lookup/constants/cities';
import { countries } from 'src/Infra/database/seeders/lookup/constants/countries';
import { days } from 'src/Infra/database/seeders/lookup/constants/days';
import { gender } from 'src/Infra/database/seeders/lookup/constants/gender';
import { roles } from 'src/Infra/database/seeders/lookup/constants/user/user.roles';
import { ResourceTenancyDto } from '../../dto/tenancy/resource.tenancy';
import { LookupList } from '../../entity/lookup/lookup.enum';
import { LookupItemNotFoundException } from 'src/utils/exception';
import { LookupItemDto } from '../../dto/lookup/lookup';
import { sessionStatus } from 'src/Infra/database/seeders/lookup/constants/session.status';

@Injectable()
export class LookupService {
  private _repo: IMongoRepository<Lookup>;

  constructor(
    @Inject('LOOKUP_MODEL') private _lookupModel: Model<Lookup>,
    @InjectMapper() private readonly _mapper: Mapper,
    private connectionService: MongooseConnectionService,
  ) {
    this._repo = new MongoRepository<Lookup>(_lookupModel);
  }

  async list(): Promise<ResourceLookupDto[]> {
    const lookups = this._mapper.mapArray(
      await this._repo.findAll(),
      Lookup,
      ResourceLookupDto,
    );
    return lookups;
  }

  async getById(id: string): Promise<ResourceLookupDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Lookup,
      ResourceLookupDto,
    );
  }

  async create(dto: CreateLookupDto): Promise<ResourceLookupDto> {
    return this._mapper.map(
      await this._repo.create(new this._lookupModel(dto)),
      Lookup,
      ResourceLookupDto,
    );
  }

  async update(dto: UpdateLookupDto): Promise<ResourceLookupDto> {
    const { _id, items } = dto;

    const lookup = await this._repo.findOne(_id);

    if (!lookup) {
      throw new NotFoundException('Lookup not found');
    }

    items.forEach((item) => {
      const itemIndex = lookup.items.findIndex((i) => i.id === item.id);
      if (itemIndex === -1) {
        throw new NotFoundException('Item not found in lookup');
      }

      lookup.items[itemIndex] = {
        id: item.id,
        label: item.label,
        order: item.order,
        parent: item.parent,
      };
    });

    return this._mapper.map(
      await this._repo.update(new this._lookupModel(lookup)),
      Lookup,
      ResourceLookupDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }

  async getByName(name: string): Promise<ResourceLookupDto> {
    return (await this.list()).find((a) => a.name === name);
  }

  async getLookupItemName(
    lookupName: LookupList,
    itemId: string,
  ): Promise<string> {
    const items = (await this.getByName(lookupName)).items.map((item) => item);

    if (!items || !itemId) {
      return '';
    }

    return items?.find((a) => a.id === itemId.toString()).label || '';
  }

  async getLookupListItemNames(
    lookupName: LookupList,
    itemIds: string[],
  ): Promise<LookupItemDto[]> {
    const items = (await this.getByName(lookupName)).items.map((item) => item);

    if (!items || itemIds.length === 0) {
      throw new LookupItemNotFoundException();
    }

    const itemIdsAsStrings = itemIds.map((id) => id.toString());

    return (
      items.filter((item) => itemIdsAsStrings.includes(item.id.toString())) ||
      []
    );
  }

  async getByGroupNames(name: string): Promise<ResourceLookupDto[]> {
    const lookups: ResourceLookupDto[] = [];

    if (name !== '' && !name.includes(',')) {
      lookups.push(await this.getByName(name));
      return lookups;
    }

    const data = await this.list();
    let separatedName = name.split(',');

    if (!data) {
      return lookups;
    }

    for (const item of separatedName) {
      let lookupData = data.find((a) => a.name == item);

      if (!lookupData) {
        continue;
      }

      lookups.push(lookupData);
    }

    return lookups;
  }

  async checkIfLookupExists(
    lookupName: LookupList,
    itemId: string,
  ): Promise<boolean> {
    if ((await this.getLookupItemName(lookupName, itemId)) != '') {
      throw new LookupItemNotFoundException();
    }

    return true;
  }

  async setConnection(model: ResourceTenancyDto): Promise<void> {
    const connection = await this.connectionService.getConnection(
      model.alias,
      model.mongoConnections,
    );
    this._lookupModel = connection.model(Lookup.name, LookupSchema);
    this._repo = new MongoRepository<Lookup>(this._lookupModel);
  }

  async seed(): Promise<boolean> {
    const lookups = this._mapper.mapArray(
      await this.list(),
      ResourceLookupDto,
      Lookup,
    );

    let lookupConstants: Lookup[] = [];

    lookupConstants.push(days);
    lookupConstants.push(gender);
    lookupConstants.push(roles);
    lookupConstants.push(sessionStatus);
    lookupConstants.push(cities);
    lookupConstants.push(countries);

    for (const lookup of lookupConstants) {
      const lookupDb = lookups.find((a) => a.name === lookup.name);
      if (lookupDb) {
        if (lookupDb.items.length != lookup.items.length) {
          const entity = new this._lookupModel(lookup);
          entity._id = new Types.ObjectId(lookupDb._id);

          await this.update(this._mapper.map(entity, Lookup, UpdateLookupDto));
        }
        continue;
      }
      await this.create(lookup);
    }

    return true;
  }

  async getRoles(): Promise<string[]> {
    const rolesLookup = (await this._repo.findAll()).reduce((acc, curr) => {
      if (curr.name === 'roles') {
        return curr;
      }
      return acc;
    }, null);

    if (!rolesLookup) {
      throw new Error('Roles lookup not found');
    }

    return rolesLookup.items.map((item) => item.label);
  }
}
