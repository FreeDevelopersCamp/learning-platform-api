import { LibraryDto } from "./library";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateLibraryDto extends LibraryDto {
    @ApiProperty({ default: '' })
    @AutoMap()
    _id: string;
}
