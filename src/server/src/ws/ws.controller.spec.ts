import { Test, TestingModule } from "@nestjs/testing";
import { WsService } from "./ws.service";

describe("MessageGateway", () => {
  let gateway: WsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsService],
    }).compile();

    gateway = module.get<WsService>(WsService);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
