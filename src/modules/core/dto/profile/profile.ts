import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  Certificate,
  Certification,
  Education,
  Experience,
  Work,
} from '../../entity/profile/profile.schema';
import { ResourceCourseDto } from 'src/modules/learn/dto/course/resource.course';
import { ResourceProjectDto } from 'src/modules/learn/dto/project/resource.project';
import { ResourceCertificationDto } from 'src/modules/learn/dto/certification/resource.certification';
import { ResourceRoadmapDto } from 'src/modules/learn/dto/roadmap/resource.roadmap';

export class CompletedDto {
  @AutoMap()
  @ApiProperty()
  completedCourses: ResourceCourseDto[];

  @AutoMap()
  @ApiProperty()
  completedProjects: ResourceProjectDto[];

  @AutoMap()
  @ApiProperty()
  completedRoadmaps: ResourceRoadmapDto[];
}

export class CompletedContentDto {
  @AutoMap()
  @ApiProperty()
  subtitle: string;

  @AutoMap()
  @ApiProperty()
  completed: CompletedDto;
}

export class CertificationDto {
  @AutoMap()
  @ApiProperty()
  subtitle: string;

  @AutoMap()
  @ApiProperty()
  certifications: ResourceCertificationDto[];

  @AutoMap()
  @ApiProperty()
  otherCertifications: Certificate[];
}

export class ProfileDto {
  @AutoMap()
  @ApiProperty({ required: false, default: '' })
  position?: string;

  @AutoMap()
  @ApiProperty({ required: false, default: '' })
  state?: string;

  @AutoMap()
  @ApiProperty({ required: false, default: '' })
  headline?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  accounts?: { name: string; url: string }[];

  @AutoMap()
  @ApiProperty({ required: false, default: '' })
  about?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  work?: Work;

  @AutoMap()
  @ApiProperty({ required: false })
  experience?: Experience;

  @AutoMap()
  @ApiProperty({ required: false })
  education?: Education;
}
