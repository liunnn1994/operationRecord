import HttpStatusCode from "./HttpStatusCode";
export interface ResInterface {
  code: HttpStatusCode;
  data: unknown;
  message: string;
}
