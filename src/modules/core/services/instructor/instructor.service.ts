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
import { CourseService } from 'src/modules/learn/services/course/course.service';
import { RoadmapService } from 'src/modules/learn/services/roadmap/roadmap.service';
import { ResourceCourseDto } from 'src/modules/learn/dto/course/resource.course';
import { UserRequested } from 'src/infra/system/system.constant';
import { InstructorException } from 'src/utils/exception';
import { CreateCourseDto } from 'src/modules/learn/dto/course/create.course';
import { UpdateCourseDto } from 'src/modules/learn/dto/course/update.course';

@Injectable()
export class InstructorService {
  private readonly _repo: IMongoRepository<Instructor>;

  constructor(
    @Inject('INSTRUCTOR_MODEL') private _instructorModel: Model<Instructor>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _userService: UserService,
    private readonly _courseService: CourseService,
    private readonly _roadmapService: RoadmapService,
  ) {
    this._repo = new MongoRepository<Instructor>(_instructorModel);
  }

  async list(): Promise<ResourceInstructorDto[]> {
    const entities = await this._repo.findAll();

    return await Promise.all(
      entities.map((entity) => {
        return this.getById.call(this, entity._id.toString());
      }),
    );
  }

  async getById(id: string): Promise<ResourceInstructorDto> {
    const entity = await this._repo.findOne(id);
    return this.toDto(entity);
  }

  async getByUserId(id: string): Promise<ResourceInstructorDto> {
    const entities = await this.list();
    return entities.find((entity) => entity.user._id === id);
  }

  async create(dto: CreateInstructorDto): Promise<ResourceInstructorDto> {
    const entity = await this._repo.create(new this._instructorModel(dto));
    return this.getById(entity._id.toString());
  }

  async update(dto: UpdateInstructorDto): Promise<ResourceInstructorDto> {
    const entity = new Instructor();
    entity._id = new Types.ObjectId(dto._id);
    entity.status = dto.status;
    entity.userId = new Types.ObjectId(UserRequested.userId);
    entity.courseIds = dto.courses.map(
      (course) => new Types.ObjectId(course._id),
    );
    entity.roadmapIds = dto.roadmaps.map(
      (roadmap) => new Types.ObjectId(roadmap._id),
    );

    await this._repo.update(new this._instructorModel(entity));
    return this.getById(entity._id.toString());
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.getById(id);

    if (entity.user.roles.length === 1) {
      await this._userService.delete(entity.user._id);
    } else {
      entity.user.roles = entity.user.roles.filter((role) => role !== '2');
      await this._userService.update(entity.user);
    }

    return await this._repo.delete(id);
  }

  async approve(id: string): Promise<ResourceInstructorDto> {
    const entity = await this.getById(id);

    entity.status = '2';
    return await this.update(entity);
  }

  async reject(id: string): Promise<Boolean> {
    return this.delete(id);
  }

  async listCourses(): Promise<ResourceCourseDto[]> {
    const userId = UserRequested.userId;
    const instructor = await this.getByUserId(userId);
    if (instructor.status == '2') {
      return instructor.courses;
    } else {
      throw new InstructorException(
        'Instructor is not approved by the Account Manager',
      );
    }
  }

  async createCourse(dto: CreateCourseDto): Promise<ResourceCourseDto> {
    const userId = UserRequested.userId;
    const instructor = await this.getByUserId(userId);

    if (instructor.status == '2') {
      const entity = await this._courseService.create(dto);
      instructor.courses.push(entity);

      const updated = new UpdateInstructorDto();
      updated._id = instructor._id;
      updated.status = instructor.status;
      updated.courses = instructor.courses;
      updated.roadmaps = instructor.roadmaps;

      await this.update(updated);
      return entity;
    } else {
      throw new InstructorException(
        'Instructor is not approved by the Account Manager',
      );
    }
  }

  async updateCourse(dto: UpdateCourseDto): Promise<ResourceCourseDto> {
    const userId = UserRequested.userId;
    const instructor = await this.getByUserId(userId);

    if (instructor.status == '2') {
      const entity = await this._courseService.update(dto);
      for (const course of instructor.courses) {
        if (course._id == entity._id) {
          course.description = entity.description;
          course.resources = entity.resources;
          course.tips = entity.tips;
          break;
        }
      }
      return entity;
    } else {
      throw new InstructorException(
        'Instructor is not approved by the Account Manager',
      );
    }
  }

  async deleteCourse(id: string): Promise<boolean> {
    const userId = UserRequested.userId;
    const instructor = await this.getByUserId(userId);

    if (instructor.status == '2') {
      const entity = await this._courseService.delete(id);
      instructor.courses = instructor.courses.filter(
        (course) => course._id != id,
      );
      return entity;
    } else {
      throw new InstructorException(
        'Instructor is not approved by the Account Manager',
      );
    }
  }

  private async toDto(entity: Instructor): Promise<ResourceInstructorDto> {
    const dto = new ResourceInstructorDto();
    dto._id = entity._id.toString();
    dto.status = entity.status;
    dto.user = await this._userService.getById(entity.userId.toString());

    dto.courses = await Promise.all(
      entity.courseIds.map(async (course) => {
        return await this._courseService.getById(course._id.toString());
      }),
    );

    dto.roadmaps = await Promise.all(
      entity.roadmapIds.map(async (roadmap) => {
        return await this._roadmapService.getById(roadmap._id.toString());
      }),
    );

    return dto;
  }
}
