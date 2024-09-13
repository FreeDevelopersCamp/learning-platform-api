import { ProgressDto } from "./progress";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProgressDto extends ProgressDto {
    @ApiProperty({ default: '' })
    @AutoMap()
    _id: string;
}
