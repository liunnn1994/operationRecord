import { checkEnv } from "./lib/index";
import { ORInterface, iProps, FetchConfig } from "./interfaces/index";
import startREC from "./actions/startREC";
import stopREC from "./actions/stopREC";
import toBlob from "./actions/toBlob";
import toWebm from "./actions/toWebm";
import download from "./actions/download";
import getSupportedMimeTypes from "./actions/getSupportedMimeTypes";

const { version, author, license, homepage } = require("../package.json");

class OperationRecord implements ORInterface {
  private isREC: boolean = false;
  private stream: any = undefined;
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
    };

    if (props) {
      Object.assign(defaultConfig, props);
    }

    for (const [key, value] of Object.entries(defaultConfig)) {
      Object.defineProperty(this, key, {
        value,
        writable: true,
      });
    }
  }
  startREC = startREC.bind(this);
  stopREC = stopREC.bind(this);
  _toBlob = toBlob.bind(this);
  toWebm = toWebm.bind(this);
  _download = download.bind(this);
  getSupportedMimeTypes = getSupportedMimeTypes.bind(this);
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
