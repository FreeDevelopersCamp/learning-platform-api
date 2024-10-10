import { Injectable } from '@nestjs/common';
import { InstructorService } from 'src/modules/core/services/instructor/instructor.service';
import { LearnerService } from 'src/modules/core/services/learner/learner.service';
import { OwnerService } from 'src/modules/core/services/owner/owner.service';
import { ManagerService } from 'src/modules/core/services/manager/manager.service';
import { AccountManagerService } from 'src/modules/core/services/AccountManager/AccountManager.service';
import { ContentManagerService } from 'src/modules/core/services/ContentManager/ContentManager.service';
import { CreateOwnerDto } from 'src/modules/core/dto/owner/create.owner';
import { CreateInstructorDto } from 'src/modules/core/dto/instructor/create.instructor';
import { CreateLearnerDto } from 'src/modules/core/dto/learner/create.learner';
import { CreateManagerDto } from 'src/modules/core/dto/manager/create.manager';
import { CreateAccountManagerDto } from 'src/modules/core/dto/AccountManager/create.AccountManager';
import { CreateContentManagerDto } from 'src/modules/core/dto/ContentManager/create.ContentManager';
import { AllowRoles } from '../_constants/roles.constants';

@Injectable()
export class RoleFactory {
  constructor(
    private readonly ownerService: OwnerService,
    private readonly instructorService: InstructorService,
    private readonly learnerService: LearnerService,
    private readonly managerService: ManagerService,
    private readonly accountManagerService: AccountManagerService,
    private readonly contentManagerService: ContentManagerService,
  ) {}

  public getServiceAndDto(role: string, userId: string) {
    if (role === AllowRoles.owner) {
      const ownerDto = new CreateOwnerDto();
      ownerDto.userId = userId;
      return {
        service: this.ownerService,
        dto: ownerDto,
      };
    } else if (role === AllowRoles.instructor) {
      const instructorDto = new CreateInstructorDto();
      instructorDto.userId = userId;
      return {
        service: this.instructorService,
        dto: instructorDto,
      };
    } else if (role === AllowRoles.learner) {
      const learnerDto = new CreateLearnerDto();
      learnerDto.userId = userId;
      return {
        service: this.learnerService,
        dto: learnerDto,
      };
    } else if (role === AllowRoles.manager) {
      const managerDto = new CreateManagerDto();
      managerDto.userId = userId;
      return {
        service: this.managerService,
        dto: managerDto,
      };
    } else if (role === AllowRoles.accountManager) {
      const accountManagerDto = new CreateAccountManagerDto();
      accountManagerDto.userId = userId;
      return {
        service: this.accountManagerService,
        dto: accountManagerDto,
      };
    } else if (role === AllowRoles.contentManager) {
      const contentManagerDto = new CreateContentManagerDto();
      contentManagerDto.userId = userId;
      return {
        service: this.contentManagerService,
        dto: contentManagerDto,
      };
    } else {
      throw new Error(`Service and DTO for role ${role} not found`);
    }
  }
}
