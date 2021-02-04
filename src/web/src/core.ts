import { checkEnv } from "./lib/index";
import { ORInterface, iProps, FetchConfig } from "./interfaces/index";
import startREC from "./actions/startREC";
import stopREC from "./actions/stopREC";
import toggleREC from "./actions/toggleREC";
import download from "./actions/download";
import initDom from "./actions/initDom";
import getSupportedMimeTypes from "./actions/getSupportedMimeTypes";
import { clickDom } from "./actions/initDom";
import { merge } from "lodash-es";

const { version, author, license, homepage } = require("../package.json");

class OperationRecord implements ORInterface {
  private stream: any = undefined;
  private mediaRecorder: any = undefined;
  private recordedChunks: any[] = [];
  private startTime: number = 0;
  public status: string = "stop";
  public DOM: HTMLElement | undefined;
  url: string;
  fetchConfig: FetchConfig;
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
  startREC = startREC.bind(this);
  stopREC = stopREC.bind(this);
  toggleREC = toggleREC.bind(this);
  _download = download.bind(this);
  getSupportedMimeTypes = getSupportedMimeTypes.bind(this);
  _dataavailableCB() {
    // 初始化dataavailable的回调，用来解决事件异步的问题
  }
  _clickDom = clickDom.bind(this);
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
