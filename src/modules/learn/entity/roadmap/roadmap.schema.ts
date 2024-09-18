import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Roadmap extends BaseEntity {}

export const RoadmapSchema = SchemaFactory.createForClass(Roadmap);
