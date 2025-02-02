import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Exam } from '../../entity/exam/exam.schema';
import { ResourceExamDto } from '../../dto/exam/resource.exam';
import { CreateExamDto } from '../../dto/exam/create.exam';
import { UpdateExamDto } from '../../dto/exam/update.exam';
import { InstructorService } from 'src/modules/core/services/instructor/instructor.service';
import { RoadmapService } from '../roadmap/roadmap.service';

@Injectable()
export class ExamService {
  private readonly _repo: IMongoRepository<Exam>;

  constructor(
    @Inject('EXAM_MODEL') private _examModel: Model<Exam>,
    @InjectMapper() private readonly _mapper: Mapper,
    private readonly _instructorService: InstructorService,
    private readonly _roadmapService: RoadmapService,
  ) {
    this._repo = new MongoRepository<Exam>(_examModel);
  }

  async list(): Promise<ResourceExamDto[]> {
    const data = await this._repo.findAll();

    return await Promise.all(data?.map(async (exam) => await this.toDto(exam)));
  }

  async getById(id: string): Promise<ResourceExamDto> {
    return this.toDto(await this._repo.findOne(id));
  }

  async create(dto: CreateExamDto): Promise<ResourceExamDto> {
    return this.toDto(await this._repo.create(new this._examModel(dto)));
  }

  async update(dto: UpdateExamDto): Promise<ResourceExamDto> {
    return this.toDto(await this._repo.update(new this._examModel(dto)));
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }

  async getByInstructor(id: string): Promise<ResourceExamDto> {
    return this.toDto(await this._examModel.findOne({ instructorId: id }));
  }

  async getByRoadmap(id: string): Promise<ResourceExamDto> {
    return this.toDto(await this._examModel.findOne({ roadmapId: id }));
  }
  async toDto(exam: Exam): Promise<ResourceExamDto> {
    const dto = new ResourceExamDto();
    dto._id = exam?._id?.toString();
    dto.name = exam?.name;
    dto.instructor = await this._instructorService.getById(
      exam?.instructorId?.toString(),
    );

    if (exam.roadmapId) {
      dto.roadmap = await this._roadmapService.getById(
        exam.roadmapId.toString(),
      );
    }

    dto.status = exam?.status;
    dto.prerequisites = exam?.prerequisites;
    dto.category = exam?.category;
    dto.topic = exam?.topic;
    dto.xp = exam?.xp;
    dto.duration = exam?.duration;
    dto.challengesToPass = exam?.challengesToPass;
    dto.questions = exam?.questions;
    dto.duration = exam?.duration;

    return dto;
  }
}
