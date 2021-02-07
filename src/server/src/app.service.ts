import { Injectable } from "@nestjs/common";
import { repositoryUrl } from "./lib/globalVars";

@Injectable()
export class AppService {
  getIndex(): string {
    return repositoryUrl;
  }
}
