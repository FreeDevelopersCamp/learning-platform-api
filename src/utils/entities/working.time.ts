import { AutoMap } from '@automapper/classes';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Day } from './types';

export class WorkingTime {
  @Prop({ required: true })
  @AutoMap()
  @ApiProperty({ required: true, default: 1 })
  day: Day;

  @Prop({ required: true })
  @AutoMap()
  @ApiProperty({ required: true, default: new Date() })
  from: Date;

  @Prop({ required: true })
  @AutoMap()
  @ApiProperty({ required: true, default: new Date() })
  to: Date;
}
