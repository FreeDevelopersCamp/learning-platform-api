import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/utils/entities/base.entity';

export class MongoConnection {
  @AutoMap()
  @IsString()
  @Prop({ required: true })
  host: string;

  @AutoMap()
  @IsNumber()
  @Prop({ required: true })
  port: number;

  @AutoMap()
  @IsString()
  @Prop()
  username: string;

  @AutoMap()
  @IsString()
  @Prop()
  password: string;

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  database: string;

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  url: string;
}

export class TenancyTrader {
  @Prop({ required: true })
  name: string;
}

@Schema({ autoCreate: false })
export class Tenancy extends BaseEntity {
  @AutoMap()
  @Prop({ required: true })
  mongoConnections: MongoConnection;

  //   @AutoMap()
  //   @Prop({ required: true })
  //   trader: TenancyTrader;

  @AutoMap()
  @IsBoolean()
  @Prop({ required: true })
  active: boolean;

  @AutoMap()
  @IsString()
  @Prop({ required: true, unique: true })
  alias: string;

  @AutoMap()
  @IsBoolean()
  @Prop({ required: false })
  systemOwner: boolean;
}

export const TenancySchema = SchemaFactory.createForClass(Tenancy);
