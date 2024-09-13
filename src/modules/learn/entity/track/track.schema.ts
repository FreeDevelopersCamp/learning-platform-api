import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Track extends BaseEntity {}

export const TrackSchema = SchemaFactory.createForClass(Track);
