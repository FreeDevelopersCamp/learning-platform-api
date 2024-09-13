import { Module } from '@nestjs/common';
import { LibraryController } from './library.controller';
import { LibraryService } from '../../services/library/library.service';
import { LibraryModels } from '../../entity/library/library.model.provider';
import { LibraryProfile } from '../../entity/library/library.mapper';

@Module({
  controllers: [
    LibraryController
  ],
  providers: [
    LibraryService,
    LibraryModels.library,
    LibraryProfile
  ]
})
export class LibraryModule {}
