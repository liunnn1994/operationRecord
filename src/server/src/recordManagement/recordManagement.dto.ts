import { ApiProperty } from "@nestjs/swagger";
export class RecordManagementFindByPKDto {
  @ApiProperty({
    type: "string",
    description: "需要查找的ID",
  })
  id: string;
}
export class RecordManagementFindByLimitDto {
  @ApiProperty({
    type: "string",
    description: "开始位置",
  })
  skip: string;
  @ApiProperty({
    type: "string",
    description: "查询的条数",
  })
  take: string;
}
