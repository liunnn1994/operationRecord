import { Injectable } from "@nestjs/common";
import { UploadInterface } from "./upload.interface";

@Injectable()
export class UploadService {
  private readonly records: UploadInterface[] = [];

  create(record: UploadInterface) {
    this.records.push(record);
  }

  findAll(): UploadInterface[] {
    return this.records;
  }
}
