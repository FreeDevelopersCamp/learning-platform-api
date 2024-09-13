import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Library } from './Library.schema';
import { LibraryDto } from '../../dto/library/library';
import { ResourceLibraryDto } from '../../dto/library/resource.library';
import { CreateLibraryDto } from '../../dto/library/create.library';
import { UpdateLibraryDto } from '../../dto/library/update.library';
import { Types } from 'mongoose';

export class LibraryProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
      }
    
      override get profile() {
        return (mapper) => {
          createMap(mapper, LibraryDto, Library);
          createMap(mapper, Library, LibraryDto);

          createMap(
            mapper,
            ResourceLibraryDto,
            Library,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => new Types.ObjectId(src._id)),
            ),
          );
          createMap(
            mapper,
            Library,
            ResourceLibraryDto,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => src._id.toString()),
            ),
          );

          createMap(mapper, ResourceLibraryDto, LibraryDto);
          createMap(mapper, LibraryDto, ResourceLibraryDto);
    
          createMap(mapper, ResourceLibraryDto, CreateLibraryDto);
          createMap(mapper, CreateLibraryDto, ResourceLibraryDto);
    
          createMap(mapper, ResourceLibraryDto, UpdateLibraryDto);
          createMap(mapper, UpdateLibraryDto, ResourceLibraryDto);
        };
      }
}
