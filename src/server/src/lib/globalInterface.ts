import HttpStatusCode from "./HttpStatusCode";
export interface ResInterface {
  code: HttpStatusCode;
  data: unknown;
  message: string;
}
export interface DatabaseResInf {
  success: boolean;
  message: string;
  error?: Error | undefined;
  data?: unknown;
}
