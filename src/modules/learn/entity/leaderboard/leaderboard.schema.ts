import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Leaderboard extends BaseEntity {}

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard);
