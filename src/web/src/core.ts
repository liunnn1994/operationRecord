import { ORInterface, iProps, FetchConfig } from "./interfaces/index";
import startREC from "./actions/startREC";
import stopREC from "./actions/stopREC";
const { version, author, license, homepage } = require("../package.json");

class OperationRecord implements ORInterface {
  private isREC = false;
  url: string;
  fetchConfig: FetchConfig;
  constructor(props: iProps) {
    const defaultConfig: iProps = {
      url: "local",
      fetchConfig: {},
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
