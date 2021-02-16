import { Body, Controller, Post } from "@nestjs/common";
import { RecordManagementService } from "./recordManagement.service";
import { ResInterface } from "../lib/globalInterface";
import HttpStatusCode from "../lib/HttpStatusCode";
import { RecordManagementFindByPKDto } from "./recordManagement.dto";

@Controller()
export class RecordManagementController {
  constructor(
    private readonly recordManagementService: RecordManagementService,
  ) {}

  @Post("/get-record-by-ids")
  async getRecordByID(
    @Body() body: RecordManagementFindByPKDto,
  ): Promise<ResInterface> {
    const res = await this.recordManagementService.findByPK(body.id);
    return {
      code: res.success
        ? HttpStatusCode.OK
        : HttpStatusCode.INTERNAL_SERVER_ERROR,
      data: res.data,
      message: res.message,
    };
  }
  @Post("/get-all-records")
  async getAllRecords(): Promise<ResInterface> {
    return {
      code: HttpStatusCode.OK,
      data: await this.recordManagementService.findAll(),
      message: "查找成功",
    };
  }
  @Post("/remove-records-by-ids")
  async removeRecordsByIDs(
    @Body() body: RecordManagementFindByPKDto,
  ): Promise<ResInterface> {
    const res = await this.recordManagementService.remove(body.id);
    return {
      code: res.success
        ? HttpStatusCode.OK
        : HttpStatusCode.INTERNAL_SERVER_ERROR,
      data: body.id,
      message: res.message,
    };
  }
}
