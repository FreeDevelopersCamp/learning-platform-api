import { AutoMap } from '@automapper/classes';
import { Prop } from '@nestjs/mongoose';
import { IsString, IsNotEmpty } from 'class-validator';

export class ParentLookup {
  @Prop()
  @IsString()
  @AutoMap()
  key: string; //name of parent lookup

  @Prop()
  @IsString()
  @AutoMap()
  value: string; //item id of parent lookup
}

export class LookupItem {
  @Prop({ required: true, maxlength: 20, unique: true })
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  id: string;

  @Prop({ required: true, maxlength: 100 })
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  label: string;

  @Prop()
  @AutoMap()
  order: number;

  @Prop()
  @AutoMap()
  parent: ParentLookup;
}
