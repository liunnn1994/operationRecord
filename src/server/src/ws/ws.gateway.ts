import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Server } from "ws";

@WebSocketGateway(Number(process.env.PORT), { namespace: "ws" })
export class WsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("events")
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: "events", data: item })),
    );
  }
}
