import { CertificationDto } from './certification';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCertificationDto extends CertificationDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
