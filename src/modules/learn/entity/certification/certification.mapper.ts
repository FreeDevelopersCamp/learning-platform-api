import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Certification } from './Certification.schema';
import { CertificationDto } from '../../dto/certification/certification';
import { ResourceCertificationDto } from '../../dto/certification/resource.certification';
import { CreateCertificationDto } from '../../dto/certification/create.certification';
import { UpdateCertificationDto } from '../../dto/certification/update.certification';
import { Types } from 'mongoose';

export class CertificationProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
      }
    
      override get profile() {
        return (mapper) => {
          createMap(mapper, CertificationDto, Certification);
          createMap(mapper, Certification, CertificationDto);

          createMap(
            mapper,
            ResourceCertificationDto,
            Certification,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => new Types.ObjectId(src._id)),
            ),
          );
          createMap(
            mapper,
            Certification,
            ResourceCertificationDto,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => src._id.toString()),
            ),
          );

          createMap(mapper, ResourceCertificationDto, CertificationDto);
          createMap(mapper, CertificationDto, ResourceCertificationDto);
    
          createMap(mapper, ResourceCertificationDto, CreateCertificationDto);
          createMap(mapper, CreateCertificationDto, ResourceCertificationDto);
    
          createMap(mapper, ResourceCertificationDto, UpdateCertificationDto);
          createMap(mapper, UpdateCertificationDto, ResourceCertificationDto);
        };
      }
}
