import { PracticeDto } from "./practice";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class ResourcePracticeDto extends PracticeDto {
    @ApiProperty({ default: '' })
    @AutoMap()
    _id: string;
}
