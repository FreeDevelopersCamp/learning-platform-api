import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Practice } from '../../entity/practice/practice.schema';
import { ResourcePracticeDto } from '../../dto/practice/resource.practice';
import { CreatePracticeDto } from '../../dto/practice/create.practice';
import { UpdatePracticeDto } from '../../dto/practice/update.practice';
import { ContentManagerService } from 'src/modules/core/services/ContentManager/ContentManager.service';
import { InstructorService } from 'src/modules/core/services/instructor/instructor.service';
import { AdminService } from 'src/modules/core/services/admin/admin.service';
import { UserService } from 'src/modules/core/services/user/user.service';
import { UserRequested } from 'src/infra/system/system.constant';
import { PracticeException } from 'src/utils/exception';
import { OwnerService } from 'src/modules/core/services/owner/owner.service';
import { ManagerService } from 'src/modules/core/services/manager/manager.service';
import { AccountManagerService } from 'src/modules/core/services/AccountManager/AccountManager.service';

@Injectable()
export class PracticeService {
  private readonly _repo: IMongoRepository<Practice>;

  constructor(
    @Inject('PRACTICE_MODEL') private _practiceModel: Model<Practice>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private readonly _adminService: AdminService,
    private readonly _ownerService: OwnerService,
    private readonly _managerService: ManagerService,
    private readonly _accountManagerService: AccountManagerService,
    private readonly _contentManagerService: ContentManagerService,
    private readonly _instructorService: InstructorService,
  ) {
    this._repo = new MongoRepository<Practice>(_practiceModel);
  }

  async list(): Promise<ResourcePracticeDto[]> {
    const entities = await this._repo.findAll();
    return Promise.all(
      entities.map(async (entity) => await this.toDto(entity)),
    );
  }

  async listByInstructor(id: string): Promise<ResourcePracticeDto[]> {
    const instructor = await this._instructorService.getById(id);

    return Promise.all(
      instructor.practicesIds.map(
        async (practiceId) => await this.getById(practiceId),
      ),
    );
  }

  async getById(id: string): Promise<ResourcePracticeDto> {
    const entity = await this._repo.findOne(id);
    return await this.toDto(entity);
  }

  async create(dto: CreatePracticeDto): Promise<ResourcePracticeDto> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new PracticeException('You are not authorized');
    }

    const entity = await this._repo.create(new this._practiceModel(dto));

    const instructor = await this._instructorService.getById(dto.instructorId);

    if (!instructor.practicesIds) {
      instructor.practicesIds = [];
    }

    instructor.practicesIds.push(entity._id.toString());
    await this._instructorService.update(instructor);

    return this.toDto(entity);
  }

  async update(dto: UpdatePracticeDto): Promise<ResourcePracticeDto> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new PracticeException('You are not authorized');
    }

    const instructor = await this._instructorService.getByUserId(
      UserRequested.userId,
    );

    if (instructor && !instructor.practicesIds.includes(dto._id)) {
      throw new PracticeException('Instructor not authorized!');
    }

    const entity = await this._repo.findOne(dto._id);

    if (dto.category) {
      entity.category = dto.category;
    }
    if (dto.name) {
      entity.name = dto.name;
    }
    if (dto.topic) {
      entity.topic = dto.topic;
    }
    if (dto.duration) {
      entity.duration = dto.duration;
    }
    if (dto.prerequisites) {
      entity.prerequisites = dto.prerequisites;
    }
    if (dto.status) {
      entity.status = dto.status;
    }
    if (dto.xp) {
      entity.xp = dto.xp;
    }
    if (dto.challengesToPass) {
      entity.challengesToPass = dto.challengesToPass;
    }
    if (dto.challenges) {
      entity.challenges = dto.challenges;
    }
    return this.toDto(await this._repo.update(new this._practiceModel(entity)));
  }

  async delete(id: string): Promise<boolean> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new PracticeException('You are not authorized');
    }

    const instructor = await this._instructorService.getByUserId(
      UserRequested.userId,
    );
    instructor.practicesIds = instructor.practicesIds.filter(
      (practiceId) => practiceId !== id,
    );
    await this._instructorService.update(instructor);
    return await this._repo.delete(id);
  }

  private async isAuthorized(userId: string): Promise<boolean> {
    const user = await this._userService.getById(userId);
    let isAdmin = false;
    let isOwner = false;
    let isManager = false;
    let isAccountManager = false;
    let isContentManager = false;
    let isInstructor = false;

    if (user.roles.includes('0')) {
      const admin = await this._adminService.getByUserId(userId);

      if (admin && admin.status == '2') {
        isAdmin = true;
      }
    } else if (user.roles.includes('1')) {
      const owner = await this._ownerService.getByUserId(userId);

      if (owner && owner.status == '2') {
        isOwner = true;
      }
    } else if (user.roles.includes('2')) {
      const manager = await this._managerService.getByUserId(userId);

      if (manager && manager.status == '2') {
        isManager = true;
      }
    } else if (user.roles.includes('3')) {
      const accountManager =
        await this._accountManagerService.getByUserId(userId);

      if (accountManager && accountManager.status == '2') {
        isAccountManager = true;
      }
    } else if (user.roles.includes('4')) {
      const contentManager =
        await this._contentManagerService.getByUserId(userId);

      if (contentManager && contentManager.status == '2') {
        isContentManager = true;
      }
    } else if (user.roles.includes('5')) {
      const instructor = await this._instructorService.getByUserId(userId);

      if (instructor && instructor.status == '2') {
        isInstructor = true;
      }
    }
    return (
      isAdmin ||
      isOwner ||
      isManager ||
      isAccountManager ||
      isContentManager ||
      isInstructor
    );
  }

  private async toDto(entity: Practice): Promise<ResourcePracticeDto> {
    const entityDto = new ResourcePracticeDto();
    entityDto._id = entity._id.toString();
    entityDto.name = entity.name;
    entityDto.prerequisites = entity.prerequisites;
    entityDto.category = entity.category;
    entityDto.topic = entity.topic;
    entityDto.status = entity.status;
    entityDto.duration = entity.duration;
    entityDto.xp = entity.xp;
    entityDto.participants = entity.participants;
    entityDto.challengesToPass = entity.challengesToPass;

    entityDto.instructor = await this._instructorService.getById(
      entity.instructorId.toString(),
    );

    entityDto.challenges = entity.challenges;
    return entityDto;
  }
}
