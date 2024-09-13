import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Project extends BaseEntity {}

export const ProjectSchema = SchemaFactory.createForClass(Project);
