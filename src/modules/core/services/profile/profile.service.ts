import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Profile } from '../../entity/profile/profile.schema';
import { ResourceProfileDto } from '../../dto/profile/resource.profile';
import { CreateProfileDto } from '../../dto/profile/create.profile';
import { UpdateProfileDto } from '../../dto/profile/update.profile';
import { UserService } from '../user/user.service';
import { CertificationService } from 'src/modules/learn/services/certification/certification.service';
import { CourseService } from 'src/modules/learn/services/course/course.service';
import { ProjectService } from 'src/modules/learn/services/project/project.service';
import { RoadmapService } from 'src/modules/learn/services/roadmap/roadmap.service';

@Injectable()
export class ProfileService {
  private readonly _repo: IMongoRepository<Profile>;

  constructor(
    @Inject('PROFILE_MODEL') private _profileModel: Model<Profile>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private readonly _certificationService: CertificationService,
    private readonly _courseService: CourseService,
    private readonly _projectService: ProjectService,
    private readonly _roadmapService: RoadmapService,
  ) {
    this._repo = new MongoRepository<Profile>(_profileModel);
  }

  async list(): Promise<ResourceProfileDto[]> {
    const entities = await this._repo.findAll();

    const entitiesDto = await Promise.all(
      entities.map(async (entity) => {
        return this.getById.call(this, entity._id.toString());
      }),
    );
    return entitiesDto;
  }

  async getById(id: string): Promise<ResourceProfileDto> {
    const entity = await this._repo.findOne(id);
    return this.toDto(entity);
  }

  async getByUserName(userName: string): Promise<ResourceProfileDto> {
    const user = await this._userService.getByUserName(userName, false);
    const entities = await this._repo.findAll();
    const entity = entities.find((e) => e.userId.toString() === user._id);
    if (!entity) return null;
    return this.toDto(entity);
  }

  async create(dto: CreateProfileDto): Promise<ResourceProfileDto> {
    const entity = await this._repo.create(new this._profileModel(dto));
    return this.getById(entity._id.toString());
  }

  async update(dto: UpdateProfileDto): Promise<ResourceProfileDto> {
    const oldDto = await this.getById(dto._id);

    const entity = new Profile();

    entity._id = new Types.ObjectId(dto._id);
    entity.position = dto?.position || oldDto?.position || null;
    entity.state = dto?.state || oldDto?.state || null;

    entity.headline = dto?.headline || oldDto?.headline || null;
    entity.accounts = dto?.accounts || oldDto?.accounts || [];
    entity.about = dto?.about || oldDto?.about || null;

    entity.work = {
      subtitle: dto?.work?.subtitle || oldDto?.work?.subtitle || '',
      works: dto?.work?.works || oldDto?.work?.works || [],
    };

    entity.experience = {
      subtitle: dto?.experience?.subtitle || oldDto?.experience?.subtitle || '',
      experiences:
        dto?.experience?.experiences || oldDto?.experience?.experiences || [],
    };

    entity.education = {
      subtitle: dto?.education?.subtitle || oldDto?.education?.subtitle || '',
      educations:
        dto?.education?.educations || oldDto?.education?.educations || [],
    };

    entity.certifications = {
      subtitle:
        dto?.certifications?.subtitle || oldDto?.certifications?.subtitle || '',
      certificationsIds:
        dto?.certifications?.certifications?.map(
          (c) => new Types.ObjectId(c._id),
        ) ||
        oldDto?.certifications?.certifications?.map(
          (c) => new Types.ObjectId(c._id),
        ) ||
        [],
    };

    entity.completedContent = {
      subtitle:
        dto?.completedContent?.subtitle ||
        oldDto?.completedContent?.subtitle ||
        '',
      completed: {
        completedCoursesIds: await Promise.all(
          dto?.completedContent?.completed?.completedCourses?.map(
            (c) => new Types.ObjectId(c._id),
          ) ||
            oldDto?.completedContent?.completed?.completedCourses?.map(
              (c) => new Types.ObjectId(c._id),
            ) ||
            [],
        ),
        completedProjectsIds: await Promise.all(
          dto?.completedContent?.completed?.completedProjects?.map(
            (p) => new Types.ObjectId(p._id),
          ) ||
            oldDto?.completedContent?.completed?.completedProjects?.map(
              (p) => new Types.ObjectId(p._id),
            ) ||
            [],
        ),
        completedRoadmapsIds: await Promise.all(
          dto?.completedContent?.completed?.completedRoadmaps?.map(
            (r) => new Types.ObjectId(r._id),
          ) ||
            oldDto?.completedContent?.completed?.completedRoadmaps?.map(
              (r) => new Types.ObjectId(r._id),
            ) ||
            [],
        ),
      },
    };

    entity.userId = new Types.ObjectId(oldDto.user._id);
    const newEntity = await this._repo.update(new this._profileModel(dto));
    return this.getById(newEntity._id.toString());
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }

  private async toDto(entity: Profile): Promise<ResourceProfileDto> {
    const dto = new ResourceProfileDto();

    dto._id = entity._id.toString();
    dto.position = entity?.position || null;
    dto.state = entity?.state || null;
    dto.headline = entity?.headline || null;
    dto.accounts = entity?.accounts || [];
    dto.about = entity?.about || null;

    dto.work = {
      subtitle: entity?.work?.subtitle || '',
      works: entity?.work?.works || [],
    };

    dto.experience = {
      subtitle: entity?.experience?.subtitle || '',
      experiences: entity?.experience?.experiences || [],
    };

    dto.education = {
      subtitle: entity?.education?.subtitle || '',
      educations: entity?.education?.educations || [],
    };

    dto.certifications = {
      subtitle: entity?.certifications?.subtitle || '',
      certifications: await Promise.all(
        entity?.certifications?.certificationsIds?.map(async (c) =>
          this._certificationService.getById(c.toString()),
        ) || [],
      ),
    };

    dto.completedContent = {
      subtitle: entity?.completedContent?.subtitle || '',
      completed: {
        completedCourses: await Promise.all(
          entity?.completedContent?.completed?.completedCoursesIds?.map(
            async (c) => this._courseService.getById(c.toString()),
          ) || [],
        ),
        completedProjects: await Promise.all(
          entity?.completedContent?.completed?.completedProjectsIds?.map(
            async (c) => this._projectService.getById(c.toString()),
          ) || [],
        ),
        completedRoadmaps: await Promise.all(
          entity?.completedContent?.completed?.completedRoadmapsIds?.map(
            async (c) => this._roadmapService.getById(c.toString()),
          ) || [],
        ),
      },
    };

    dto.user = await this._userService.getById(entity.userId.toString());

    return dto;
  }
}
