import { envErrors } from "./errorStatus";
/**
 * 检查运行环境
 *
 * */
export function checkEnv() {
  let res = "";
  if (!navigator.mediaDevices) {
    if (
      !/localhost|127.0.0.1/.test(location.hostname ?? "") ||
      location.protocol !== "https"
    ) {
      res = envErrors.NotLocalhostOrHttps;
    } else {
      res = envErrors.NotSupportMediaDevices;
    }
  }
  return res;
}
