import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Tutorial extends BaseEntity {}

export const TutorialSchema = SchemaFactory.createForClass(Tutorial);
