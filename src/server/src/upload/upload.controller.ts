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
import { diskStorage } from "multer";
import { UploadInterface } from "./upload.interface";

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("/upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./public/uploads",
        filename(req, file, cb) {
          const { body } = req;
          return cb(null, `${body.filename}.${body.extname}`);
        },
      }),
    }),
  )
  uploadFile(@Body() body: SampleDto, @UploadedFile() file) {
    console.log(file);
    this.uploadService.create({
      name: file.filename,
      path: file.destination,
      mimetype: file.mimetype,
      size: file.size,
      logs: body.logs,
      originalname: file.originalname,
      encoding: file.originalname,
    } as UploadInterface);
    return file;
  }
}
