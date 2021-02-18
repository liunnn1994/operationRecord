declare global {
  interface MediaDevices {
    getDisplayMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
  }
  interface MediaTrackConstraintSet {
    displaySurface?: ConstrainDOMString;
    logicalSurface?: ConstrainBoolean;
  }
}
export interface FetchConfig {
  method?: string;
  headers?: typeof Headers;
  body?: any;
  mode?: "cors" | "no-cors" | "same-origin";
  credentials?: "omit" | "same-origin" | "include" | any;
  cache?:
    | "default"
    | "no-store"
    | "reload"
    | "no-cache"
    | "force-cache"
    | "only-if-cached";
  redirect?: "follow" | "error" | "manual";
  referrer?: "no-referrer" | "client" | string;
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "unsafe-url";
  integrity?: string;
}

interface HotKeys {
  start?: KeyboardEvent["code"] | KeyboardEvent["code"][];
  stop?: KeyboardEvent["code"] | KeyboardEvent["code"][];
  toggleREC?: KeyboardEvent["code"] | KeyboardEvent["code"][];
}
interface DomOptions {
  show?: boolean;
  style: any;
}

export interface iProps {
  url?: "local" | string;
  fetchConfig?: FetchConfig;
  mediaConstraints?: any;
  mimeType?: string;
  lang?: string;
  hotKeys?: HotKeys;
  dom?: DomOptions;
  onStartREC?: Function;
  onStopREC?: Function;
  onPauseREC?: Function;
  onResumeREC?: Function;
}

export interface LoggerItem {
  level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  content: string;
  timestamp: number;
}

export interface ORInterface extends iProps {
  DOM: HTMLElement | undefined;
  startTime: number;
  status: string;
  recordedChunks: any[];
  logs: LoggerItem[];
  mediaRecorder: MediaRecorder | undefined;
  stream: MediaStream | undefined;
  startREC: Function;
  stopREC: Function;
  toggleREC: Function;
  on: Function;
  _download: Function;
  getSupportedMimeTypes: Function;
  _dataavailableCB: Function;
  _clickDom: Function;
  logger: Function;
  _errorCollector: Function;
  getBlob: Function;
  getExtname: Function;
  reset: Function;
  _upload: Function;
}

interface MediaDevicesErrorStatus {
  key:
    | "AbortError"
    | "InvalidStateError"
    | "NotAllowedError"
    | "NotFoundError"
    | "NotReadableError"
    | "OverconstrainedError"
    | "TypeError";
}

export interface ErrorStatus {
  key: MediaDevicesErrorStatus["key"];
}

export interface InsertRule {
  selector: string;
  style: Object;
}

export interface CurrencyInterfaces {
  loggerType:
    | "emerg"
    | "alert"
    | "crit"
    | "err"
    | "warning"
    | "notice"
    | "info"
    | "debug"
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7;
}
