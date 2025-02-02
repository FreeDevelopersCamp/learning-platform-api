import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Roadmap } from '../../entity/roadmap/roadmap.schema';
import { ResourceRoadmapDto } from '../../dto/roadmap/resource.roadmap';
import { CreateRoadmapDto } from '../../dto/roadmap/create.roadmap';
import { UpdateRoadmapDto } from '../../dto/roadmap/update.roadmap';
import { UserService } from 'src/modules/core/services/user/user.service';
import { AdminService } from 'src/modules/core/services/admin/admin.service';
import { OwnerService } from 'src/modules/core/services/owner/owner.service';
import { ManagerService } from 'src/modules/core/services/manager/manager.service';
import { AccountManagerService } from 'src/modules/core/services/AccountManager/AccountManager.service';
import { ContentManagerService } from 'src/modules/core/services/ContentManager/ContentManager.service';
import { InstructorService } from 'src/modules/core/services/instructor/instructor.service';
import { CourseService } from '../course/course.service';
import { PracticeService } from '../practice/practice.service';
import { ProjectService } from '../project/project.service';
import { ExamService } from '../exam/exam.service';
import { CertificationService } from '../certification/certification.service';
import { RoadmapException } from 'src/utils/exception';
import { UserRequested } from 'src/infra/system/system.constant';
import { RatingDto } from '../../dto/course/update.course';

@Injectable()
export class RoadmapService {
  private readonly _repo: IMongoRepository<Roadmap>;

  constructor(
    @Inject('ROADMAP_MODEL') private _roadmapModel: Model<Roadmap>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private readonly _adminService: AdminService,
    private readonly _ownerService: OwnerService,
    private readonly _managerService: ManagerService,
    private readonly _accountManagerService: AccountManagerService,
    private readonly _contentManagerService: ContentManagerService,
    private readonly _instructorService: InstructorService,
  ) {
    this._repo = new MongoRepository<Roadmap>(_roadmapModel);
  }

  async list(): Promise<ResourceRoadmapDto[]> {
    const entities = await this._repo.findAll();
    return Promise.all(
      entities.map(async (entity) => await this.toDto(entity)),
    );
  }

  async listByInstructor(id: string): Promise<ResourceRoadmapDto[]> {
    const instructor = await this._instructorService.getById(id);

    return Promise.all(
      instructor?.roadmapsIds?.map(
        async (roadmapId) => await this.getById(roadmapId),
      ),
    );
  }

  async getById(id: string): Promise<ResourceRoadmapDto> {
    const entity = await this._repo.findOne(id);
    return await this.toDto(entity);
  }

  async create(dto: CreateRoadmapDto): Promise<ResourceRoadmapDto> {
    const roadmapData = {
      ...dto,
      orderIds: dto.orderIds.map((id) => new Types.ObjectId(id)),
      coursesIds: dto.coursesIds.map((id) => new Types.ObjectId(id)),
      practicesIds: dto.practicesIds?.map((id) => new Types.ObjectId(id)),
      projectsIds: dto.projectsIds?.map((id) => new Types.ObjectId(id)),
    };

    const entity = await this._repo.create(new this._roadmapModel(roadmapData));

    const instructor = await this._instructorService.getById(dto.instructorId);

    if (!instructor.roadmapsIds) {
      instructor.roadmapsIds = [];
    }

    instructor.roadmapsIds.push(entity._id.toString());
    await this._instructorService.update(instructor);

    return await this.toDto(entity);
  }

  async update(dto: UpdateRoadmapDto): Promise<ResourceRoadmapDto> {
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
    if (dto.status) {
      entity.status = dto.status;
    }
    if (dto.xp) {
      entity.xp = dto.xp;
    }
    if (dto.description) {
      entity.description = dto.description;
    }
    if (dto.participants) {
      entity.participants = dto.participants;
    }
    if (dto.duration) {
      entity.duration = dto.duration;
    }
    if (dto.tag) {
      entity.tag = dto.tag;
    }
    if (dto.keywords) {
      entity.keywords = dto.keywords;
    }
    if (dto.prerequisites) {
      entity.prerequisites = dto.prerequisites;
    }
    if (dto.rating) {
      entity.rating = dto.rating;
    }
    if (dto.coursesIds) {
      entity.coursesIds = dto.coursesIds.map((id) => new Types.ObjectId(id));
    }
    if (dto.practicesIds) {
      entity.practicesIds = dto.practicesIds.map(
        (id) => new Types.ObjectId(id),
      );
    }
    if (dto.projectsIds) {
      entity.projectsIds = dto.projectsIds.map((id) => new Types.ObjectId(id));
    }
    if (dto.examId) {
      entity.examId = new Types.ObjectId(dto.examId);
    }
    if (dto.certificationId) {
      entity.certificationId = new Types.ObjectId(dto.certificationId);
    }
    if (dto.relatedRoadmapsIds) {
      entity.relatedRoadmapsIds = dto.relatedRoadmapsIds.map(
        (id) => new Types.ObjectId(id),
      );
    }
    if (dto.frequentlyAskedQuestions) {
      entity.frequentlyAskedQuestions = dto.frequentlyAskedQuestions;
    }

    return this.toDto(await this._repo.update(new this._roadmapModel(entity)));
  }

  async delete(id: string): Promise<boolean> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new RoadmapException('You are not authorized');
    }

    const instructor = await this._instructorService.getByUserId(
      UserRequested.userId,
    );
    instructor.roadmapsIds = instructor.roadmapsIds.filter(
      (roadmapId) => roadmapId !== id,
    );
    await this._instructorService.update(instructor);
    return await this._repo.delete(id);
  }

  async addRating(dto: RatingDto): Promise<ResourceRoadmapDto> {
    const entity = await this._repo.findOne(dto._id);

    const userId = dto.userId;

    if (entity?.raters?.includes(userId)) {
      throw new RoadmapException('You have already rated this roadmap!');
    }

    if (!entity.raters) entity.raters = [];

    entity.raters.push(userId);

    const totalRatings =
      Number(entity.rating) * (entity.raters.length - 1) + Number(dto.rating);
    const newRating = totalRatings / entity.raters.length;

    entity.rating = Math.min(Math.max(newRating, 0), 5).toFixed(1);

    return this.toDto(await this._repo.update(new this._roadmapModel(entity)));
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

  private async toDto(entity: Roadmap): Promise<ResourceRoadmapDto> {
    const entityDto = new ResourceRoadmapDto();
    entityDto._id = entity._id.toString();
    entityDto.name = entity.name;
    entityDto.description = entity.description;
    entityDto.status = entity.status;
    entityDto.category = entity.category;
    entityDto.participants = entity.participants;
    entityDto.topic = entity.topic;
    entityDto.duration = entity.duration;
    entityDto.xp = entity.xp;
    entityDto.rating = entity.rating;
    entityDto.tag = entity.tag;
    entityDto.keywords = entity.keywords;
    entityDto.prerequisites = entity.prerequisites;

    entityDto.instructor = await this._instructorService.getById(
      entity?.instructorId?.toString(),
    );

    entityDto.coursesIds = entity?.coursesIds?.map((id) => id?.toString());

    entityDto.practicesIds = entity?.practicesIds?.map((id) => id?.toString());
    entityDto.projectsIds = entity?.projectsIds?.map((id) => id?.toString());
    entityDto.examId = entity?.examId?.toString();
    entityDto.certificationId = entity?.certificationId?.toString();

    if (entity.relatedRoadmapsIds) {
      entityDto.relatedRoadmaps = await Promise.all(
        entity?.relatedRoadmapsIds?.map(
          async (id) => await this.getById(id?.toString()),
        ),
      );
    }

    entityDto.orderIds = await Promise.all(
      entity?.orderIds?.map(async (id) => {
        return id?.toString();
      }),
    );

    return entityDto;
  }
}
