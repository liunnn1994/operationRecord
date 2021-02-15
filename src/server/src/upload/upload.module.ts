import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { RecordManagementModule } from "../recordManagement/recordManagement.module";

@Module({
  imports: [RecordManagementModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
