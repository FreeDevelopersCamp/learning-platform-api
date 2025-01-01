import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Instructor } from '../../entity/instructor/instructor.schema';
import { ResourceInstructorDto } from '../../dto/instructor/resource.instructor';
import { CreateInstructorDto } from '../../dto/instructor/create.instructor';
import { UpdateInstructorDto } from '../../dto/instructor/update.instructor';
import { UserService } from '../user/user.service';
import { InstructorException } from 'src/utils/exception';
import { AdminService } from '../admin/admin.service';
import { OwnerService } from '../owner/owner.service';
import { ManagerService } from '../manager/manager.service';
import { AccountManagerService } from '../AccountManager/AccountManager.service';
import { ContentManagerService } from '../ContentManager/ContentManager.service';

@Injectable()
export class InstructorService {
  private readonly _repo: IMongoRepository<Instructor>;

  constructor(
    @Inject('INSTRUCTOR_MODEL') private _instructorModel: Model<Instructor>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private readonly _adminService: AdminService,
    private readonly _ownerService: OwnerService,
    private readonly _managerService: ManagerService,
    private readonly _accountManagerService: AccountManagerService,
    private readonly _contentManagerService: ContentManagerService,
  ) {
    this._repo = new MongoRepository<Instructor>(_instructorModel);
  }

  async list(): Promise<ResourceInstructorDto[]> {
    const entities = await this._repo.findAll();

    return await Promise.all(
      entities.map(async (entity) => {
        return await this.toDto(entity);
      }),
    );
  }

  async getById(id: string): Promise<ResourceInstructorDto> {
    const entity = await this._repo.findOne(id);
    return await this.toDto(entity);
  }

  async create(dto: CreateInstructorDto): Promise<ResourceInstructorDto> {
    const entity = await this._repo.create(new this._instructorModel(dto));
    return await this.toDto(entity);
  }

  async update(dto: UpdateInstructorDto): Promise<ResourceInstructorDto> {
    const entity = new Instructor();
    entity._id = new Types.ObjectId(dto._id);
    const old = await this.getById(entity?._id.toString());

    if (!old) {
      throw new InstructorException(`Could not find this entity`);
    }

    entity.status = dto.status || old?.status;
    entity.userId = new Types.ObjectId(old?.user._id);
    entity.coursesIds =
      dto?.coursesIds?.map((id) => new Types.ObjectId(id)) ||
      old?.coursesIds?.map((id) => new Types.ObjectId(id));
    entity.roadmapIds =
      dto?.roadmapsIds?.map((id) => new Types.ObjectId(id)) ||
      old?.roadmapsIds?.map((id) => new Types.ObjectId(id));
    entity.practicesIds =
      dto?.practicesIds?.map((id) => new Types.ObjectId(id)) ||
      old?.practicesIds?.map((id) => new Types.ObjectId(id));
    entity.projectsIds =
      dto?.projectsIds?.map((id) => new Types.ObjectId(id)) ||
      old?.projectsIds?.map((id) => new Types.ObjectId(id));

    const updated = await this._repo.update(new this._instructorModel(entity));
    return await this.toDto(updated);
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.getById(id);

    if (entity.status == '2') {
      throw new InstructorException('You can not delete active entities');
    }

    if (entity.user.roles.length === 1) {
      await this._userService.delete(entity.user._id);
    } else {
      entity.user.roles = entity.user.roles.filter((role) => role !== '5');
      await this._userService.update(entity.user);
    }

    return await this._repo.delete(id);
  }

  async approve(id: string): Promise<ResourceInstructorDto> {
    const entity = await this.getById(id);
    if (entity.status == '2')
      throw new InstructorException('This entity is already approved!');

    entity.status = '2';
    return await this.update(entity);
  }

  async reject(id: string): Promise<Boolean> {
    const entity = await this.getById(id);

    if (entity.status != '1') {
      throw new InstructorException('You can only reject pending entities!');
    }
    return await this.delete(id);
  }

  async deactivate(id: string): Promise<ResourceInstructorDto> {
    // const authorized = await this.isAuthorized(UserRequested.userId);

    // if (!authorized) {
    //   throw new InstructorException('You are not authorized');
    // }

    // const userRequested = await this._userService.getById(UserRequested.userId);
    const dto = await this.getById(id);

    if (dto.status == '1') {
      throw new InstructorException('This entity is still pending!');
    }

    // if (
    //   !userRequested.roles.includes('0') &&
    //   !userRequested.roles.includes('1') &&
    //   !userRequested.roles.includes('2') &&
    //   !userRequested.roles.includes('3')
    // ) {
    //   const userEntity = await this.getByUserId(userRequested._id);
    //   if (userEntity._id != id) {
    //     throw new InstructorException(
    //       'You are not authorized to deactivate this entity.',
    //     );
    //   }
    // }

    const entity = new UpdateInstructorDto();
    entity._id = dto._id;
    entity.status = '3';
    entity.user = dto.user;
    return await this.update(entity);
  }

  async getByUserId(id: string): Promise<ResourceInstructorDto> {
    // await this.isAuthorized(UserRequested.userId);

    const entities = await this._repo.findAll();
    const entity = entities.find((entity) => entity.userId.toString() === id);

    if (!entity) {
      throw new InstructorException('Entity not found');
    }

    return await this.toDto(entity);
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
      const instructor = await this.getByUserId(userId);

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

  private async toDto(entity: Instructor): Promise<ResourceInstructorDto> {
    const dto = new ResourceInstructorDto();
    dto._id = entity._id.toString();
    dto.status = entity.status;
    dto.user = await this._userService.getById(entity.userId.toString());

    dto.coursesIds = entity.coursesIds?.map((id) => id.toString());
    dto.roadmapsIds = entity.roadmapIds?.map((id) => id.toString());
    dto.practicesIds = entity.practicesIds?.map((id) => id.toString());
    dto.projectsIds = entity.projectsIds?.map((id) => id.toString());

    return dto;
  }
}
