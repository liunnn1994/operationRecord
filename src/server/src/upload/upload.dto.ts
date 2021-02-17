import { ApiProperty } from "@nestjs/swagger";
export class UploadDto {
  @ApiProperty({ type: String, description: "后缀名" })
  extname: string;
  @ApiProperty({ type: String, description: "文件名" })
  filename: string;
  @ApiProperty({ type: String, description: "log的集合" })
  logs: string;
  @ApiProperty({ type: String, description: "開始時間" })
  startTime: string;
  @ApiProperty({ type: "Binary", description: "上传的文件" })
  file: BinaryType;
}
