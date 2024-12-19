import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Image extends BaseEntity {}

export const ImageSchema = SchemaFactory.createForClass(Image);
