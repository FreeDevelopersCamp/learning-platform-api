import { ExamDto } from "./exam";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class ResourceExamDto extends ExamDto {
    @ApiProperty({ default: '' })
    @AutoMap()
    _id: string;
}
