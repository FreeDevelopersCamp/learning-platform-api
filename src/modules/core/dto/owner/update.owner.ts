import { OwnerDto } from './owner';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOwnerDto extends OwnerDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
