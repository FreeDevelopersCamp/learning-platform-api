import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Email } from './Email.schema';
import { EmailDto } from '../../dto/email/email';
import { ResourceEmailDto } from '../../dto/email/resource.email';
import { CreateEmailDto } from '../../dto/email/create.email';
import { UpdateEmailDto } from '../../dto/email/update.email';
import { Types } from 'mongoose';

export class EmailProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, EmailDto, Email);
      createMap(mapper, Email, EmailDto);

      createMap(
        mapper,
        ResourceEmailDto,
        Email,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
      );
      createMap(
        mapper,
        Email,
        ResourceEmailDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
      );

      createMap(mapper, ResourceEmailDto, EmailDto);
      createMap(mapper, EmailDto, ResourceEmailDto);

      createMap(mapper, ResourceEmailDto, CreateEmailDto);
      createMap(mapper, CreateEmailDto, ResourceEmailDto);

      createMap(mapper, ResourceEmailDto, UpdateEmailDto);
      createMap(mapper, UpdateEmailDto, ResourceEmailDto);
    };
  }
}
