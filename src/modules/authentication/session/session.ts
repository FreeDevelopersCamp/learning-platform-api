import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';
import { Connection } from 'mongoose';

export class DeviceInformation {
  @Prop({ required: true })
  @AutoMap()
  @ApiProperty({ default: '' })
  ip: string;

  @Prop({ required: true })
  @AutoMap()
  @ApiProperty({ default: '' })
  name: string;

  @Prop({ required: true })
  @AutoMap()
  @ApiProperty({ default: '' })
  browser: string;
}

@Schema({ autoCreate: false })
export class Session extends BaseEntity {
  @Prop({ required: true })
  @AutoMap()
  @ApiProperty({ default: '', required: true })
  username: string;

  @Prop({ required: true })
  @AutoMap()
  @ApiProperty({ default: '', required: true })
  password: string;

  @Prop({ required: true })
  @AutoMap()
  @ApiProperty({ default: 1, required: true })
  attempts: number;

  @Prop({ required: false })
  @AutoMap()
  @ApiProperty({ default: '', required: false })
  token?: string;

  @Prop({ required: true })
  @AutoMap()
  @ApiProperty({ default: 1 })
  status: string; //from lookup

  @Prop({ required: true })
  @AutoMap()
  @ApiProperty({ default: 1 })
  active: boolean;

  @Prop({ required: true })
  @AutoMap()
  @ApiProperty({ default: '', type: DeviceInformation })
  deviceInformation: DeviceInformation;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

export const SessionModels = {
  session: {
    provide: 'SESSION_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Session.name, SessionSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};

export interface SessionParams {
  username: string;
  password: string;
  token: string;
  status: string;
  active: boolean;
}
