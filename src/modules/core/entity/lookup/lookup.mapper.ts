import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Global, Injectable } from '@nestjs/common';
import { Lookup } from './lookup.schema';
import { ResourceLookupDto } from '../../dto/lookup/resource.lookup';
import {
  LookupItemDto,
  ParentLookupDto,
  LookupDto,
} from '../../dto/lookup/lookup';
import { LookupItem, ParentLookup } from './item.lookup';
import { Types } from 'mongoose';

@Global()
@Injectable()
export class LookupProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        ResourceLookupDto,
        Lookup,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
        forMember(
          (dest) => dest.items,
          mapFrom((src) => src.items),
        ),
      );
      createMap(
        mapper,
        Lookup,
        ResourceLookupDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
        forMember(
          (dest) => dest.items,
          mapFrom((src) => src.items),
        ),
      );

      createMap(
        mapper,
        LookupItemDto,
        LookupItem,
        forMember(
          (dest) => dest.parent,
          mapFrom((src) => src.parent),
        ),
      );
      createMap(
        mapper,
        LookupItem,
        LookupItemDto,
        forMember(
          (dest) => dest.parent,
          mapFrom((src) => src.parent),
        ),
      );

      createMap(mapper, ParentLookupDto, ParentLookup);
      createMap(mapper, ParentLookup, ParentLookupDto);

      createMap(mapper, LookupDto, Lookup);
      createMap(mapper, Lookup, LookupDto);

      createMap(mapper, LookupItemDto, LookupItem);
      createMap(mapper, LookupItem, LookupItemDto);

      createMap(mapper, ParentLookupDto, ParentLookup);
      createMap(mapper, ParentLookup, ParentLookupDto);
    };
  }
}
