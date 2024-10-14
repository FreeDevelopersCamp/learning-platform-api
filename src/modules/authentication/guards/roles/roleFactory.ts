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
import { CreateAdminDto } from 'src/modules/core/dto/admin/create.admin';
import { AdminService } from 'src/modules/core/services/admin/admin.service';

@Injectable()
export class RoleFactory {
  constructor(
    private readonly adminService: AdminService,
    private readonly ownerService: OwnerService,
    private readonly instructorService: InstructorService,
    private readonly learnerService: LearnerService,
    private readonly managerService: ManagerService,
    private readonly accountManagerService: AccountManagerService,
    private readonly contentManagerService: ContentManagerService,
  ) {}

  public getServiceAndDto(role: string, userId: string) {
    if (role === AllowRoles.admin) {
      const dto = new CreateAdminDto();
      dto.userId = userId;
      return {
        service: this.adminService,
        dto: dto,
      };
    } else if (role === AllowRoles.owner) {
      const dto = new CreateOwnerDto();
      dto.userId = userId;
      return {
        service: this.ownerService,
        dto: dto,
      };
    } else if (role === AllowRoles.instructor) {
      const dto = new CreateInstructorDto();
      dto.userId = userId;
      return {
        service: this.instructorService,
        dto: dto,
      };
    } else if (role === AllowRoles.learner) {
      const dto = new CreateLearnerDto();
      dto.userId = userId;
      return {
        service: this.learnerService,
        dto: dto,
      };
    } else if (role === AllowRoles.manager) {
      const dto = new CreateManagerDto();
      dto.userId = userId;
      return {
        service: this.managerService,
        dto: dto,
      };
    } else if (role === AllowRoles.accountManager) {
      const dto = new CreateAccountManagerDto();
      dto.userId = userId;
      return {
        service: this.accountManagerService,
        dto: dto,
      };
    } else if (role === AllowRoles.contentManager) {
      const dto = new CreateContentManagerDto();
      dto.userId = userId;
      return {
        service: this.contentManagerService,
        dto: dto,
      };
    } else {
      throw new Error(`Service and DTO for role ${role} not found`);
    }
  }
}
