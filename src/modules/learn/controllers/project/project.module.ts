import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from '../../services/project/project.service';
import { ProjectModels } from '../../entity/project/project.model.provider';
import { ProjectProfile } from '../../entity/project/project.mapper';

@Module({
  controllers: [
    ProjectController
  ],
  providers: [
    ProjectService,
    ProjectModels.project,
    ProjectProfile
  ]
})
export class ProjectModule {}
