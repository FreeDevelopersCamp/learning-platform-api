import { AutoMap } from '@automapper/classes';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class Address {
  @AutoMap()
  @IsNumber()
  @Prop()
  @ApiProperty({ required: false, default: 0 })
  country: string; //from lookup

  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  @Prop()
  @ApiProperty({ required: false, default: 0 })
  city: string; //from lookup

  @AutoMap()
  @IsString()
  @Prop({ maxlength: 30 })
  @ApiProperty({ required: false, default: '' })
  street?: string;

  @AutoMap()
  @Prop()
  @ApiProperty({ required: false, default: '' })
  postalCode?: string;
}
