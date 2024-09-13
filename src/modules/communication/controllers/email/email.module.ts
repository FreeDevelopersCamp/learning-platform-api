import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from '../../services/email/email.service';
import { EmailModels } from '../../entity/email/email.model.provider';
import { EmailProfile } from '../../entity/email/email.mapper';
import { EmailValidationService } from '../../services/email/email.validation.service';

@Module({
  controllers: [EmailController],
  providers: [
    EmailService,
    EmailModels.email,
    EmailProfile,
    EmailValidationService,
  ],
})
export class EmailModule {}
