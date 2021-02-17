import { Canceler } from "axios";

export interface Res {
  code: number;
  data?: unknown;
  message?: string;
  error?: string | Error;
  cancel?: Canceler;
}
