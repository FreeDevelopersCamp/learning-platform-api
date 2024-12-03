import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class SessionData {
  @AutoMap()
  @ApiProperty({ required: false })
  userName?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  email?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  role: string;

  @AutoMap()
  @ApiProperty({ required: false })
  token: string;

  @AutoMap()
  @ApiProperty({ required: false })
  attempts: number;

  @AutoMap()
  @ApiProperty({ required: false })
  status: string;

  @AutoMap()
  @ApiProperty({ required: false })
  active: boolean;
}
