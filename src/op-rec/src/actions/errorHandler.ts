import { CurrencyInterfaces, LoggerItem } from "../types/op-rec";
import OpRecInterface from "../types/index";
import { logLevels } from "../lib/globalVars";
import { isError } from "lodash-es";

export const logger = function (
  this: OpRecInterface,
  type: CurrencyInterfaces["loggerType"],
  e: ErrorEvent | string
) {
  let level: number;
  if (typeof type === "string") {
    level = logLevels[type];
  } else {
    level = type;
  }
  this.logs.push({
    level,
    content: isError(e) ? e.stack : String(e),
    timestamp: new Date().getTime(),
  } as LoggerItem);
};
export const errorCollector = function (this: OpRecInterface, e: ErrorEvent) {
  this.logger(3, e.error);
};
