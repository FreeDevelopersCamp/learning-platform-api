import { CourseDto } from "./course";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class ResourceCourseDto extends CourseDto {
    @ApiProperty({ default: '' })
    @AutoMap()
    _id: string;
}