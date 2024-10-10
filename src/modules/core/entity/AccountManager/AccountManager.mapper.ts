import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { AccountManager } from './AccountManager.schema';
import { AccountManagerDto } from '../../dto/AccountManager/AccountManager';
import { ResourceAccountManagerDto } from '../../dto/AccountManager/resource.AccountManager';
import { CreateAccountManagerDto } from '../../dto/AccountManager/create.AccountManager';
import { UpdateAccountManagerDto } from '../../dto/AccountManager/update.AccountManager';
import { Types } from 'mongoose';

export class AccountManagerProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, AccountManagerDto, AccountManager);
      createMap(mapper, AccountManager, AccountManagerDto);

      createMap(
        mapper,
        ResourceAccountManagerDto,
        AccountManager,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
      );
      createMap(
        mapper,
        AccountManager,
        ResourceAccountManagerDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
      );

      createMap(mapper, ResourceAccountManagerDto, AccountManagerDto);
      createMap(mapper, AccountManagerDto, ResourceAccountManagerDto);

      createMap(mapper, ResourceAccountManagerDto, CreateAccountManagerDto);
      createMap(mapper, CreateAccountManagerDto, ResourceAccountManagerDto);

      createMap(mapper, ResourceAccountManagerDto, UpdateAccountManagerDto);
      createMap(mapper, UpdateAccountManagerDto, ResourceAccountManagerDto);
    };
  }
}
