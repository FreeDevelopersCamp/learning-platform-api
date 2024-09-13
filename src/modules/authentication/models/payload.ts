import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { MenuDto } from 'src/modules/core/dto/menu/menu';

export class Payload {
  userId: string;
  username: string;
  tenancyId: string;
  roles: string[];
  menu: MenuDto[];
}

export class Token {
  @ApiProperty({ default: '' })
  @IsString()
  token: string;
}
