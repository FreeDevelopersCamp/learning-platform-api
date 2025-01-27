import { MessageDto } from "./message";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMessageDto extends MessageDto {
    @ApiProperty({ default: '' })
    @AutoMap()
    _id: string;
}
