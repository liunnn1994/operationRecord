import { Injectable } from "@nestjs/common";
import { RecordManagementInterface } from "../recordManagement/recordManagement.interface";
import { writeFileSync } from "fs-extra";
import { uploadDir } from "../lib/globalVars";
import { extname, join } from "path";

@Injectable()
export class UploadService {
  generateVtt(newRec: RecordManagementInterface) {
    const { startTime, name, logs } = newRec;
    const st = Number(startTime);
    const { formatVttTime } = this;
    const header = `WEBVTT - ${name}字幕文件`;
    const content = `${header}
  ${logs
    .map((log: any, index: number) => {
      const { timestamp } = log as any;
      const nextTamp = logs[index + 1]?.timestamp ?? new Date().getTime();
      return `

  ${formatVttTime(timestamp - st)} --> ${formatVttTime(nextTamp - st)}
  错误等级：${log.level}
  ${log.content}`;
    })
    .join("")}`;

    writeFileSync(
      join(uploadDir, `${name.replace(extname(name), "")}.vtt`),
      content,
    );
  }
  formatVttTime(timestamp: number) {
    return `${Math.floor(timestamp / 3600000)
      .toString()
      .padStart(2, "0")}:${Math.floor((timestamp / 1000 / 60) % 60000)
      .toString()
      .padStart(2, "0")}:${Math.floor((timestamp / 1000) % 60)
      .toString()
      .padStart(2, "0")}.${timestamp.toString().substr(-3)}`;
  }
}
