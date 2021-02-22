import { checkEnv } from "./lib/index";
import { IProps, FetchConfig, GlobalTypesInterfaces } from "./types/op-rec";
import OpRecInterface from "./types/index";
import startREC from "./actions/startREC";
import stopREC from "./actions/stopREC";
import { reset } from "./actions/stopREC";
import toggleREC from "./actions/toggleREC";
import { download, upload } from "./actions/downloadAndUpload";
import initDom from "./actions/initDom";
import onEvents from "./actions/events";
import { getBlob, getExtname } from "./actions/events";
import getSupportedMimeTypes from "./actions/getSupportedMimeTypes";
import { clickDom } from "./actions/initDom";
import { errorCollector, logger } from "./actions/errorHandler";
import { merge } from "lodash-es";

class OpRec implements OpRecInterface {
  stream = undefined;
  mediaRecorder = undefined;
  recordedChunks: any[] = [];
  logs = [];
  startTime = 0;
  status: GlobalTypesInterfaces["status"] = "stop";
  DOM: HTMLElement | undefined;
  url: string | undefined;
  fetchConfig: FetchConfig | undefined;
  mediaConstraints: any;
  private props: IProps | undefined;
  constructor(props?: IProps) {
    this.props = props;
    const check = checkEnv();
    if (check !== "") {
      console.error(check);
    }
    const defaultConfig: IProps = {
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
    // @ts-ignore
    initDom.call(this);
  }
  // @ts-ignore
  startREC: () => void = startREC.bind(this);
  // @ts-ignore
  stopREC: () => void = stopREC.bind(this);
  // @ts-ignore
  toggleREC: () => void = toggleREC.bind(this);
  // @ts-ignore
  _download: () => void = download.bind(this);
  // @ts-ignore
  on = onEvents.bind(this);
  getSupportedMimeTypes: () => void = getSupportedMimeTypes.bind(this);
  _dataavailableCB() {
    // 初始化dataavailable的回调，用来解决事件异步的问题
  }
  // @ts-ignore
  _clickDom = clickDom.bind(this);
  // @ts-ignore
  logger = logger.bind(this);
  // @ts-ignore
  _errorCollector = errorCollector.bind(this);
  // @ts-ignore
  getBlob: () => void = getBlob.bind(this);
  // @ts-ignore
  getExtname: () => void = getExtname.bind(this);
  // @ts-ignore
  reset: () => void = reset.bind(this);
  // @ts-ignore
  _upload: () => void = upload.bind(this);
}

export default OpRec;
