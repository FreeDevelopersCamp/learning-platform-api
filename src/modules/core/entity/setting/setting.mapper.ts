import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Types } from 'mongoose';
import { ResourceSettingDto } from '../../dto/setting/resource.setting';
import { Setting } from './setting.schema';
import { CreateSettingDto } from '../../dto/setting/create.setting';
import { SettingDto } from '../../dto/setting/setting';
import { UpdateSettingDto } from '../../dto/setting/update.setting';

export class SettingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        ResourceSettingDto,
        Setting,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
      );
      createMap(
        mapper,
        Setting,
        ResourceSettingDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
      );

      createMap(mapper, SettingDto, Setting);
      createMap(mapper, Setting, SettingDto);

      createMap(mapper, ResourceSettingDto, SettingDto);
      createMap(mapper, SettingDto, ResourceSettingDto);

      createMap(mapper, ResourceSettingDto, CreateSettingDto);
      createMap(mapper, CreateSettingDto, ResourceSettingDto);

      createMap(mapper, ResourceSettingDto, UpdateSettingDto);
      createMap(mapper, UpdateSettingDto, ResourceSettingDto);
    };
  }
}
