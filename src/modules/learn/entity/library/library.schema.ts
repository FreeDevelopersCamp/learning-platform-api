import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Library extends BaseEntity {}

export const LibrarySchema = SchemaFactory.createForClass(Library);
