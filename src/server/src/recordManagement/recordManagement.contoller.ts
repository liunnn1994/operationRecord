import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { RecordManagementService } from "./recordManagement.service";

@Controller()
export class RecordManagementController {
  constructor(
    private readonly recordManagementService: RecordManagementService,
  ) {}

  @Post("/get-record-by-id")
  getRecordByID() {
    return "";
  }
}
