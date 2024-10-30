import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Admin } from './Admin.schema';
import { AdminDto } from '../../dto/admin/admin';
import { ResourceAdminDto } from '../../dto/admin/resource.admin';
import { CreateAdminDto } from '../../dto/admin/create.admin';
import { UpdateAdminDto } from '../../dto/admin/update.admin';
import { Types } from 'mongoose';

export class AdminProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, AdminDto, Admin);
      createMap(mapper, Admin, AdminDto);

      createMap(
        mapper,
        ResourceAdminDto,
        Admin,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
      );
      createMap(
        mapper,
        Admin,
        ResourceAdminDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
      );

      createMap(mapper, ResourceAdminDto, AdminDto);
      createMap(mapper, AdminDto, ResourceAdminDto);

      createMap(mapper, ResourceAdminDto, CreateAdminDto);
      createMap(mapper, CreateAdminDto, ResourceAdminDto);

      createMap(mapper, ResourceAdminDto, UpdateAdminDto);
      createMap(mapper, UpdateAdminDto, ResourceAdminDto);
    };
  }
}
