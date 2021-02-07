import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getIndex(): string {
    return "https://github.com/asdjgfr/operationRecord";
  }
}
