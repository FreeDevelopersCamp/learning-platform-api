import { ImageDto } from "./Image";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateImageDto extends ImageDto {
    @ApiProperty({ default: '' })
    @AutoMap()
    _id: string;
}
