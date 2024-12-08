import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Course } from '../../entity/course/course.schema';
import { ResourceCourseDto } from '../../dto/course/resource.course';
import { CreateCourseDto } from '../../dto/course/create.course';
import { RatingDto, UpdateCourseDto } from '../../dto/course/update.course';
import { InstructorService } from 'src/modules/core/services/instructor/instructor.service';
import { CourseException } from 'src/utils/exception';
import { UserRequested } from 'src/infra/system/system.constant';
import { UserService } from 'src/modules/core/services/user/user.service';
import { ContentManagerService } from 'src/modules/core/services/ContentManager/ContentManager.service';
import { AdminService } from 'src/modules/core/services/admin/admin.service';

@Injectable()
export class CourseService {
  private readonly _repo: IMongoRepository<Course>;

  constructor(
    @Inject('COURSE_MODEL') private _courseModel: Model<Course>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private readonly _adminService: AdminService,
    private readonly _contentManagerService: ContentManagerService,
    private readonly _instructorService: InstructorService,
  ) {
    this._repo = new MongoRepository<Course>(_courseModel);
  }

  async list(): Promise<ResourceCourseDto[]> {
    const courses = await this._repo.findAll();
    return Promise.all(courses.map((course) => this.toDto(course)));
  }

  async listByInstructor(id: string): Promise<ResourceCourseDto[]> {
    const instructor = await this._instructorService.getById(id);

    return Promise.all(
      instructor.coursesIds.map(
        async (courseId) => await this.getById(courseId),
      ),
    );
  }

  async getById(id: string): Promise<ResourceCourseDto> {
    return this.toDto(await this._repo.findOne(id));
  }

  async create(dto: CreateCourseDto): Promise<ResourceCourseDto> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new CourseException('You are not authorized');
    }

    const entity = await this._repo.create(new this._courseModel(dto));

    const instructor = await this._instructorService.getById(dto.instructorId);
    instructor.coursesIds.push(entity._id.toString());
    await this._instructorService.update(instructor);

    return this.getById(entity._id.toString());
  }

  async addRating(dto: RatingDto): Promise<ResourceCourseDto> {
    const entity = await this._repo.findOne(dto._id);

    const userId = dto.userId;

    if (entity?.raters?.includes(userId)) {
      throw new CourseException('You have already rated this course!');
    }

    if (!entity.raters) entity.raters = [];

    entity.raters.push(userId);

    const totalRatings =
      Number(entity.rating) * (entity.raters.length - 1) + Number(dto.rating);
    const newRating = totalRatings / entity.raters.length;

    entity.rating = Math.min(Math.max(newRating, 0), 5).toFixed(1);

    return this.toDto(await this._repo.update(new this._courseModel(entity)));
  }

  async update(dto: UpdateCourseDto): Promise<ResourceCourseDto> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new CourseException('You are not authorized');
    }

    const instructor = await this._instructorService.getByUserId(
      UserRequested.userId,
    );

    if (instructor && !instructor.coursesIds.includes(dto._id)) {
      throw new CourseException('Instructor not authorized!');
    }

    const entity = await this._repo.findOne(dto._id);

    if (dto.category) {
      entity.category = dto.category;
    }
    if (dto.name) {
      entity.name = dto.name;
    }
    if (dto.description) {
      entity.description = dto.description;
    }
    if (dto.topic) {
      entity.topic = dto.topic;
    }
    if (dto.duration) {
      entity.duration = dto.duration;
    }
    if (dto.parentId) {
      entity.parentId = new Types.ObjectId(dto.parentId);
    }
    if (dto.status) {
      entity.status = dto.status;
    }
    if (dto.resources) {
      entity.resources = dto.resources;
    }
    if (dto.tips) {
      entity.tips = dto.tips;
    }
    if (dto.xp) {
      entity.xp = dto.xp;
    }
    if (dto.rating) {
      entity.rating = dto.rating;
    }
    if (dto.raters) {
      entity.raters = dto.raters;
    }
    if (dto.subCoursesIds) {
      entity.subCoursesIds = dto.subCoursesIds.map(
        (id) => new Types.ObjectId(id),
      );
    }

    return this.toDto(await this._repo.update(new this._courseModel(entity)));
  }

  async delete(id: string): Promise<boolean> {
    const authorized = await this.isAuthorized(UserRequested.userId);

    if (!authorized) {
      throw new CourseException('You are not authorized');
    }

    const instructor = await this._instructorService.getByUserId(
      UserRequested.userId,
    );
    instructor.coursesIds = instructor.coursesIds.filter(
      (courseId) => courseId !== id,
    );
    await this._instructorService.update(instructor);
    return await this._repo.delete(id);
  }

  private async isAuthorized(userId: string): Promise<boolean> {
    const user = await this._userService.getById(userId);
    let isAdmin = false;
    let isContentManager = false;
    let isInstructor = false;

    if (user.roles.includes('0')) {
      const admin = await this._adminService.getByUserId(userId);

      if (admin && admin.status == '2') {
        isAdmin = true;
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
    return isAdmin || isContentManager || isInstructor;
  }

  private async toDto(entity: Course): Promise<ResourceCourseDto> {
    const entityDto = new ResourceCourseDto();
    entityDto._id = entity._id.toString();
    entityDto.name = entity.name;
    entityDto.description = entity.description;
    entityDto.category = entity.category;
    entityDto.topic = entity.topic;
    entityDto.status = entity.status;
    entityDto.duration = entity.duration;
    entityDto.xp = entity.xp;
    entityDto.rating = entity.rating;

    entityDto.instructor = await this._instructorService.getById(
      entity.instructorId.toString(),
    );

    if (entity.parentId) {
      entityDto.parentId = entity.parentId.toString();
    }

    if (entity.subCoursesIds) {
      entityDto.subCourses = await Promise.all(
        entity.subCoursesIds.map(async (id) => this.getById(id.toString())),
      );
    }
    entityDto.resources = entity.resources;
    entityDto.tips = entity.tips;
    return entityDto;
  }
}
