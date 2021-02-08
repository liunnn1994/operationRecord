import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { SampleDto } from "./sample.dto";

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("/upload")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@Body() body: SampleDto, @UploadedFile() file) {
    return { filename: `${body["filename"]}.${body["extname"]}` };
  }
}
