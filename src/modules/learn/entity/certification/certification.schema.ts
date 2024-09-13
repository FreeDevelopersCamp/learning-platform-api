import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Certification extends BaseEntity {}

export const CertificationSchema = SchemaFactory.createForClass(Certification);
