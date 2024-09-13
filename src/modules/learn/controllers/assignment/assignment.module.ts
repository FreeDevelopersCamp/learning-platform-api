import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from '../../services/assignment/assignment.service';
import { AssignmentModels } from '../../entity/assignment/assignment.model.provider';
import { AssignmentProfile } from '../../entity/assignment/assignment.mapper';

@Module({
  controllers: [
    AssignmentController
  ],
  providers: [
    AssignmentService,
    AssignmentModels.assignment,
    AssignmentProfile
  ]
})
export class AssignmentModule {}
