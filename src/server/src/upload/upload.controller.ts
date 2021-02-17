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
import { UploadDto } from "./upload.dto";
import { diskStorage } from "multer";
import HttpStatusCode from "../lib/HttpStatusCode";
import { ResInterface } from "../lib/globalInterface";
import { uploadDir } from "../lib/globalVars";
import { RecordManagementInterface } from "../recordManagement/recordManagement.interface";

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
        destination: uploadDir,
        filename(req, file, cb) {
          const { body } = req;
          return cb(null, `${body.filename}.${body.extname}`);
        },
      }),
    }),
  )
  async uploadFile(
    @Body() body: UploadDto,
    @UploadedFile() file,
  ): Promise<ResInterface> {
    const { logs } = body;
    const newRec: RecordManagementInterface = {
      name: file.filename,
      path: file.destination,
      mimetype: file.mimetype,
      size: String(file.size),
      logs: Array.isArray(JSON.parse(logs)) ? JSON.parse(logs) : [],
      originalname: file.originalname,
      encoding: file.encoding,
      startTime: body.startTime,
    };
    const item = await this.recordManagementService.create(newRec);
    this.uploadService.generateVtt(newRec);
    return {
      code: item.success
        ? HttpStatusCode.OK
        : HttpStatusCode.INTERNAL_SERVER_ERROR,
      data: item.data ?? file,
      message: item.error
        ? `${item.message}：${String(item.error)}`
        : item.message,
    };
  }
}
