import { IsString, IsDate } from 'class-validator';
import { Prop, Schema } from '@nestjs/mongoose';
import { AutoMap } from '@automapper/classes';
import { Types } from 'mongoose';

export class DocumentAudit {
  @Prop({ required: false })
  @IsDate()
  at: Date;

  @Prop({ required: false })
  @IsString()
  by: string;
}

@Schema({ autoCreate: false })
export class BaseEntity {
  @AutoMap()
  _id: Types.ObjectId;

  @Prop()
  created: DocumentAudit;

  @Prop()
  updated: DocumentAudit;
}
