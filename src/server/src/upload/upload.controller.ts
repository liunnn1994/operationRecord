import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { SampleDto } from "./sample.dto";

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseInterceptors(FileInterceptor("files"))
  @Post("upload")
  uploadFile(@Body() body: SampleDto, @UploadedFiles() files) {
    console.log(files);
    return {
      body,
    };
  }
}
