import { AutoMap } from '@automapper/classes';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class Mobile {
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  @Prop()
  @ApiProperty({ required: false, default: 0 })
  provider?: number;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @Prop({ maxlength: 5 })
  @ApiProperty({ required: false, default: '' })
  countryCode?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ maxlength: 13, default: '' })
  mobile: string;
}

export class Contact {
  @AutoMap()
  @IsEmail()
  @IsNotEmpty()
  @Prop({ maxlength: 25 })
  @ApiProperty({ required: true, default: '' })
  email: string;

  @AutoMap()
  @Prop({ default: { Mobile } })
  @ApiProperty({ required: true, default: Mobile })
  mobile: Mobile;

  @AutoMap()
  @Prop({ default: { Mobile } })
  @ApiProperty({ required: true, default: Mobile })
  emergencyMobile: Mobile;
}
