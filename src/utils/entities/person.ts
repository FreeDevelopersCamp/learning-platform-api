import { AutoMap } from '@automapper/classes';
import { Prop } from '@nestjs/mongoose';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { DateUtils } from '../date';
import { ApiProperty } from '@nestjs/swagger';

export class Name {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @Prop({ maxlength: 10 })
  @ApiProperty({ required: true, default: '' })
  first: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @Prop({ maxlength: 10 })
  @ApiProperty({ required: false, default: '' })
  second?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @Prop({ maxlength: 10 })
  @ApiProperty({ required: false, default: '' })
  third?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @Prop({ maxlength: 10 })
  @ApiProperty({ required: true, default: '' })
  last: string;
}

export class Person {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @Prop({ maxlength: 10 })
  @ApiProperty({ required: true, default: Name })
  name: Name;

  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  @Prop()
  @ApiProperty({ required: true, default: 0 })
  gender: string; //from lookup

  @AutoMap()
  @IsNotEmpty()
  @Prop({ type: Date })
  @ApiProperty({ required: false, default: DateUtils.getJSDate() })
  dateOfBirth?: Date;
}
