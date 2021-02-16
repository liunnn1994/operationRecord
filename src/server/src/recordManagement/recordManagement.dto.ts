import { ApiProperty } from "@nestjs/swagger";
export class RecordManagementFindByPKDto {
  @ApiProperty({
    type: "string",
    description: "需要查找的ID",
  })
  id: string;
}
