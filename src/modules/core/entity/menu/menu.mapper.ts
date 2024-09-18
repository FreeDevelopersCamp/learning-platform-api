import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreateMenuDto } from '../../dto/menu/create.menu';
import { MenuDto } from '../../dto/menu/menu';
import { ResourceMenuDto } from '../../dto/menu/resource.menu';
import { UpdateMenuDto } from '../../dto/menu/update.menu';
import { Menu } from './menu.schema';
import { Types } from 'mongoose';

export class MenuProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, MenuDto, Menu);
      createMap(mapper, Menu, MenuDto);

      createMap(
        mapper,
        ResourceMenuDto,
        Menu,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
        forMember(
          (dest) => dest.subMenu,
          mapFrom((src) => src.subMenu),
        ),
      );
      createMap(
        mapper,
        Menu,
        ResourceMenuDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
        forMember(
          (dest) => dest.subMenu,
          mapFrom((src) => src.subMenu),
        ),
      );

      createMap(
        mapper,
        ResourceMenuDto,
        MenuDto,
        forMember(
          (dest) => dest.subMenu,
          mapFrom((src) => src.subMenu),
        ),
      );
      createMap(
        mapper,
        MenuDto,
        forMember(
          (dest) => dest.subMenu,
          mapFrom((src) => src.subMenu),
        ),
      );

      createMap(mapper, ResourceMenuDto, CreateMenuDto);
      createMap(mapper, CreateMenuDto, ResourceMenuDto);

      createMap(mapper, ResourceMenuDto, UpdateMenuDto);
      createMap(mapper, UpdateMenuDto, ResourceMenuDto);
    };
  }
}
