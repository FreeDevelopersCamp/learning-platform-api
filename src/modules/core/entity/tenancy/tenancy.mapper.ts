import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
} from '@automapper/core';
import { Global, Injectable } from '@nestjs/common';
import { ResourceTenancyDto } from '../../dto/tenancy/resource.tenancy';
import { Tenancy } from './tenancy.schema';
import { Types } from 'mongoose';

@Global()
@Injectable()
export class TenancyProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        ResourceTenancyDto,
        Tenancy,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
        forMember(
          (dest) => dest.mongoConnections,
          mapFrom((src) => src.mongoConnections),
        ),
        // forMember(
        //   (dest) => dest.trader,
        //   mapFrom((src) => src.trader),
        // ),
      );

      createMap(
        mapper,
        Tenancy,
        ResourceTenancyDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
        forMember(
          (dest) => dest.mongoConnections,
          mapFrom((src) => src.mongoConnections),
        ),
        // forMember(
        //   (dest) => dest.trader,
        //   mapFrom((src) => src.trader),
        // ),
        forMember((dest) => dest.user, ignore()),
      );
    };
  }
}
