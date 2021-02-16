import { Body, Controller, Post } from "@nestjs/common";
import { RecordManagementService } from "./recordManagement.service";
import { ResInterface } from "../lib/globalInterface";
import HttpStatusCode from "../lib/HttpStatusCode";

@Controller()
export class RecordManagementController {
  constructor(
    private readonly recordManagementService: RecordManagementService,
  ) {}

  @Post("/get-record-by-id")
  async getRecordByID(@Body() body): Promise<ResInterface> {
    const res = await this.recordManagementService.findByPK(body.id);
    return {
      code: res.success
        ? HttpStatusCode.OK
        : HttpStatusCode.INTERNAL_SERVER_ERROR,
      data: res.data,
      message: res.message,
    };
  }
}
