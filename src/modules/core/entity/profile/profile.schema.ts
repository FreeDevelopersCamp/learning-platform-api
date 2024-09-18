import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Profile extends BaseEntity {}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
