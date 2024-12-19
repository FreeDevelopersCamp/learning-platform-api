import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Image } from './Image.schema';
import { ImageDto } from '../../dto/Image/Image';
import { ResourceImageDto } from '../../dto/Image/resource.Image';
import { CreateImageDto } from '../../dto/Image/create.Image';
import { UpdateImageDto } from '../../dto/Image/update.Image';
import { Types } from 'mongoose';

export class ImageProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
      }
    
      override get profile() {
        return (mapper) => {
          createMap(mapper, ImageDto, Image);
          createMap(mapper, Image, ImageDto);

          createMap(
            mapper,
            ResourceImageDto,
            Image,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => new Types.ObjectId(src._id)),
            ),
          );
          createMap(
            mapper,
            Image,
            ResourceImageDto,
            forMember(
              (dest) => dest._id,
              mapFrom((src) => src._id.toString()),
            ),
          );

          createMap(mapper, ResourceImageDto, ImageDto);
          createMap(mapper, ImageDto, ResourceImageDto);
    
          createMap(mapper, ResourceImageDto, CreateImageDto);
          createMap(mapper, CreateImageDto, ResourceImageDto);
    
          createMap(mapper, ResourceImageDto, UpdateImageDto);
          createMap(mapper, UpdateImageDto, ResourceImageDto);
        };
      }
}
