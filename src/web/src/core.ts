import { checkEnv } from "./lib/index";
import { ORInterface, iProps, FetchConfig } from "./interfaces/index";
import startREC from "./actions/startREC";
import stopREC from "./actions/stopREC";
import { reset } from "./actions/stopREC";
import toggleREC from "./actions/toggleREC";
import download from "./actions/download";
import initDom from "./actions/initDom";
import onEvents from "./actions/events";
import { getBlob, getExtname } from "./actions/events";
import getSupportedMimeTypes from "./actions/getSupportedMimeTypes";
import { clickDom } from "./actions/initDom";
import { errorCollector, logger } from "./actions/errorHandler";
import { merge } from "lodash-es";

const { version, author, license, homepage } = require("../package.json");

class OperationRecord implements ORInterface {
  stream = undefined;
  mediaRecorder = undefined;
  recordedChunks: any[] = [];
  logs = [];
  startTime = 0;
  status = "stop";
  DOM: HTMLElement | undefined;
  url: string | undefined;
  fetchConfig: FetchConfig | undefined;
  mediaConstraints: any;
  constructor(props: iProps) {
    const check = checkEnv();
    if (check !== "") {
      console.error(check);
    }
    const defaultConfig: iProps = {
      url: "local",
      fetchConfig: {},
      mediaConstraints: {
        video: true,
        audio: true,
      },
      mimeType: getSupportedMimeTypes()[0],
      lang: "zh",
      dom: {
        show: true,
        style: {
          position: "fixed",
          right: "2rem",
          bottom: "2rem",
          width: "40px",
          height: "40px",
          zIndex: "1000",
          cursor: "pointer",
        },
      },
    };

    merge(this, defaultConfig, props);
    initDom.call(this);
  }
  startREC: Function = startREC.bind(this);
  stopREC: Function = stopREC.bind(this);
  toggleREC: Function = toggleREC.bind(this);
  _download: Function = download.bind(this);
  on: Function = onEvents.bind(this);
  getSupportedMimeTypes: Function = getSupportedMimeTypes.bind(this);
  _dataavailableCB() {
    // 初始化dataavailable的回调，用来解决事件异步的问题
  }
  _clickDom: Function = clickDom.bind(this);
  logger: Function = logger.bind(this);
  _errorCollector: Function = errorCollector.bind(this);
  getBlob: Function = getBlob.bind(this);
  getExtname: Function = getExtname.bind(this);
  reset: Function = reset.bind(this);
}

for (const [key, value] of Object.entries({
  version,
  author,
  license,
  homepage,
})) {
  Object.defineProperty(OperationRecord.prototype, key, {
    value,
  });
}

export default OperationRecord;
