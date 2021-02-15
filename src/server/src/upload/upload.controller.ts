import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { RecordManagementService } from "../recordManagement/recordManagement.service";
import { SampleDto } from "./sample.dto";
import { diskStorage } from "multer";
import HttpStatusCode from "../lib/HttpStatusCode";
import { ResInterface } from "../lib/globalInterface";

@Controller()
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly recordManagementService: RecordManagementService,
  ) {}

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
  uploadFile(@Body() body: SampleDto, @UploadedFile() file): ResInterface {
    this.recordManagementService.create({
      name: file.filename,
      path: file.destination,
      mimetype: file.mimetype,
      size: file.size,
      logs: body.logs,
      originalname: file.originalname,
      encoding: file.originalname,
    });
    return { code: HttpStatusCode.OK, data: file, message: "" };
  }
}
