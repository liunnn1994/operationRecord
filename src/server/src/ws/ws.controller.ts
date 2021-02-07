import { Controller } from "@nestjs/common";
import { WsService } from "./ws.service";

@Controller()
export class WsController {
  constructor(private readonly appService: WsService) {}
}
