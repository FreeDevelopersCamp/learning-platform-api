import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateMenuDto } from '../../dto/menu/create.menu';
import { ResourceMenuDto } from '../../dto/menu/resource.menu';
import { UpdateMenuDto } from '../../dto/menu/update.menu';
import { Menu } from '../../entity/menu/menu.schema';
import { UserRequested } from 'src/infra/system/system.constant';
import { UserService } from '../user/user.service';

@Injectable()
export class MenuService {
  private readonly _repo: IMongoRepository<Menu>;

  constructor(
    @Inject('MENU_MODEL') private _menuModel: Model<Menu>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
  ) {
    this._repo = new MongoRepository<Menu>(_menuModel);
  }

  async list(): Promise<ResourceMenuDto[]> {
    const user = await this._userService.getById(UserRequested.userId);
    if (!user) {
      return [];
    }

    const allMenus = this._mapper.mapArray(
      await this._repo.findAll(),
      Menu,
      ResourceMenuDto,
    );

    const menusDto = await this._getMenuByRole(allMenus, user.roles);
    return menusDto;
  }

  async getById(id: string): Promise<ResourceMenuDto> {
    const menu = await this._repo.findOne(id);
    return this._mapper.map(menu, Menu, ResourceMenuDto);
  }

  async create(dto: CreateMenuDto): Promise<ResourceMenuDto> {
    const menu = await this._repo.create(new this._menuModel(dto));
    return this._mapper.map(menu, Menu, ResourceMenuDto);
  }

  async update(dto: UpdateMenuDto): Promise<ResourceMenuDto> {
    const updatedMenu = await this._repo.update(new this._menuModel(dto));
    return this._mapper.map(updatedMenu, Menu, ResourceMenuDto);
  }

  async delete(id: string): Promise<boolean> {
    return this._repo.delete(id);
  }

  private async _getMenuByRole(
    menu: ResourceMenuDto[],
    userRoles: string[],
  ): Promise<ResourceMenuDto[]> {
    const filteredMenu: ResourceMenuDto[] = [];

    if (menu.length === 0) {
      return menu;
    }

    menu.forEach(async (item) => {
      if (item && this._rolesAllowed(item.roles, userRoles)) {
        let filteredSubMenu: ResourceMenuDto[] = [];

        if (
          item.subMenu &&
          !item.subMenu.some((a) => a == null) &&
          item.subMenu.length > 0
        ) {
          filteredSubMenu = await this._getMenuByRole(
            item.subMenu as ResourceMenuDto[],
            userRoles,
          );
        }

        filteredMenu.push({
          ...item,
          subMenu: filteredSubMenu,
        });
      }
    });

    return filteredMenu;
  }

  private _rolesAllowed(menuRoles: string[], userRoles: string[]): Boolean {
    return menuRoles?.some((role) => userRoles.includes(role)) || false;
  }
}
