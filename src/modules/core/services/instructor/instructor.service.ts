import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
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
    const instructors = await this._repo.findAll();

    const instructorsDto = await Promise.all(
      instructors.map((instructor) => {
        return this.getById.call(this, instructor._id.toString());
      }),
    );

    return instructorsDto;
  }

  async getById(id: string): Promise<ResourceInstructorDto> {
    const instructor = await this._repo.findOne(id);
    return this.toDto(instructor);
  }

  async create(dto: CreateInstructorDto): Promise<ResourceInstructorDto> {
    const instructor = await this._repo.create(new this._instructorModel(dto));
    return this.getById(instructor._id.toString());
  }

  async update(dto: UpdateInstructorDto): Promise<ResourceInstructorDto> {
    const instructor = await this._repo.create(new this._instructorModel(dto));
    return this.getById(instructor._id.toString());
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }

  private async toDto(instructor: Instructor): Promise<ResourceInstructorDto> {
    const instructorDto = new ResourceInstructorDto();
    instructorDto._id = instructor._id.toString();

    instructorDto.user = await this._userService.getById(
      instructor.userId.toString(),
    );

    instructorDto.courses = await Promise.all(
      instructor.courseIds.map(async (course) => {
        return await this._courseService.getById(course._id.toString());
      }),
    );

    instructorDto.roadmaps = await Promise.all(
      instructor.roadmapIds.map(async (roadmap) => {
        return await this._roadmapService.getById(roadmap._id.toString());
      }),
    );

    return instructorDto;
  }
}
