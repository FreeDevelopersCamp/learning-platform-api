import { Module } from '@nestjs/common';
import { CertificationController } from './certification.controller';
import { CertificationService } from '../../services/certification/certification.service';
import { CertificationModels } from '../../entity/certification/certification.model.provider';
import { CertificationProfile } from '../../entity/certification/certification.mapper';

@Module({
  controllers: [CertificationController],
  providers: [
    CertificationService,
    CertificationModels.certification,
    CertificationProfile,
  ],
  exports: [CertificationService],
})
export class CertificationModule {}
