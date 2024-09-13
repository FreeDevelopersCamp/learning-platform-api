import { AuthenticationDto } from './authentication';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthenticationDto extends AuthenticationDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
